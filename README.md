# Mapping eBird

This work represents my explorations in mapping eBird data coverage to reveal patterns of standardization and user diversity over space and time.

## Outline
1. [Introduction](#introduction)
2. [Getting eBird Data](#getting-ebird-data)
3. [Processing in PostGIS](#processing-in-postgis)
4. [Making the Map in CartoDB](#making-the-map-in-cartodb)
5. [Final Reflections](#final-reflections)

## Introduction

In 2002, The Cornell Lab or Ornithology and National Audubon Society launched the eBird project – a real-time, online checklist to collect bird observations submitted by the public. In its first decade, eBird participation has grown dramatically with tens of millions of observations now submitted each year. The project has not only revolutionized the way that the ornithological community reports and accesses information about birds, it has also become one of the largest databases of biodiversity information in the world.

As an increasingly successful citizen science project, eBird has just as much to teach us about publicly-derived data collection as it does about birds. This project focuses on mapping patterns of eBird participation to develop best practices for visualizing the spatial and temporal quality and quantity of submitted data. By sharing data coverage information with the public in a cartographically clear manner, we can enhance understanding of the project and improve the utility of the dataset by inspiring participants to collect more data in poorly covered areas. While this project focuses specifically on visualizing eBird data coverage, the work has broader applications for improving how any crowd-sourced data collection project educates its participants.

### Goals
My goal for this project was to build an interactive map that reveals eBird data coverage in terms of three metrics:
	* General Checklist Coverage
	* Standardized Checklist Coverage
	* Contributor Diversity

## Getting eBird Data

To download eBird data, you need to create an eBird account and to be granted permission through a request form. Once you've been granted permission, you can download the data here: http://ebird.org/ebird/data/download

For this work, I needed the **Basic Dataset (EBD)** and the prepackaged option of **Sampling Event Data**. Sampling Event Data contains only data about submitted checklists (who, what, when, where), but no information about the birds observed. Because my project focuses on data coverage, this was all I needed.

## Processing in PostGIS

### Making `geom` from `Latitude` & `Longitude`

Perhaps the most important SQL commands I needed were those that would build geometries from the latitude and longitude data in my eBird database. I wanted to build two geometry fields: one unprojected (WGS84, SRID 4326) and one projected ("Web Mercator", SRID 3857). Storing two geometry columns certainly added to the size of my database, but it made me feel better about staying flexbile for future uses of the data.

To create a geometry column using a standard geographic (lat/lon) coordinate system, I added a point geometry field, `geom`, and set the SRID to `4326`: standard WGS84. I used the `ST_MakePoint` command to use my `latitude` and `longitude` field values to construct each geometry, then wrapped that in the `ST_SetSRID` command to assign `4326`. This command took about an hour to process:

**Create unprojected geom (4326):**

```sql
ALTER TABLE ebdus13 ADD COLUMN geom geometry(POINT,4326);
UPDATE ebdus13 SET geom = ST_SetSRID(ST_MakePoint(longitude, latitude),4326);
```

With an unprojected `geom` field in place, I created another field called `geom_wm` to house the geometry projected as “Web Mercator” or “Pseudo Mercator”, SRID `3857`. Apparently, projecting geometry data takes even longer than writing it in the first place — this command took over five hours to run:

**Transform geom to geom_wm, projected in 3857:**

```sql
ALTER TABLE ebdus13 ADD COLUMN geom_prj geometry(POINT,3857);
UPDATE ebdus13 SET geom_prj = ST_Transform(geom,3857);
```

I recognize that having two geometry fields is probably unnecessary, but given the size of my database, I felt better having two indexed geometry fields than having to “reproject” the geometry for each row in a query. Two geometry columns certainly take up much more space, but in my case, I thought the time this might save me in the future was worth the trade-off. After a bit of research online about indexing geometry columns, I indexed both geometry columns using GIST, which seemed to be the best method.

```sql
CREATE INDEX ON ebdus13 USING GIST (geom_wm);
```

At this point, I had a functioning, indexed database of all the 2013 eBird observations across the world. I moved on to the final phase of my project: visualizing the data.

### Completeness

Before submitting a checklist to eBird, contributors are asked the question, **"Did you record all bird species observed to the best of your abilities?"** A **Yes** answer to this question makes a checklist *much* more useful than a **No** answer, because inferences can be drawn about the absence of all species *not* observed. This data is stored as a boolean value, `0` or `1`, in the field `all_species_reported`.

I wanted to use the `all_species_reported` field to quantify the number of "complete" vs. "incomplete" checklists, I needed to account for errors in reporting. Some eBird contributors misunderstand the completeness question when submitting "Casual" observations and answer **Yes** even though a "Casual" observation, by definition, implies that birding was not the primary purpose of your outing, and therefore you could not have recorded *all* the species you observed. So, a truer measure of Completeness counts only those observations `WHERE protocol_type != 'eBird - Casual Observation' AND all_species_reported = 1`.

I created a new field `complete` to the my postgres table `ebdus13` and populated it using the following sql statement:

```sql
ALTER TABLE ebdus13 ADD COLUMN complete integer;

UPDATE ebdus13
SET complete
CASE 
  WHEN protocol_type != 'eBird - Casual Observation' AND all_species_reported = 1 THEN 1
  ELSE 0
END;
```

## Making the Map in CartoDB

text...

## Final Reflections

text...
