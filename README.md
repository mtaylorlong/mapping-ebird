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

You will
Data from the eBird project and other citizen science bird-related initiatives is stored in a central database managed by the Avian Knowledge Network. The data can be downloaded by anyone with eBird login credentials after submitting a request for 30 days of access to the download portal. Having been granted a request before, I was able to link to previous work I’ve done with the data as part of my new request. My request was granted the day after submission and I was contacted by the eBird Project Director who complimented my work and encouraged me to continue.

## Processing in PostGIS

### Standardization

'''sql
SELECT *
WHERE
'''

## Making the Map in CartoDB

text...

## Final Reflections

text...
