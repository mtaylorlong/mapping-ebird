WITH hgrid AS (
SELECT
ST_Transform(CDB_HexagonGrid(ST_Transform(ST_SetSRID(ST_Envelope(ST_Extent(the_geom_webmercator)::geometry),3857),42303), 10000),3857) as cell
FROM mnwi
  )
SELECT
  hgrid.cell as the_geom_webmercator,
  count(i.cartodb_id) as points,
  sum(i.complete) as complete,
  sum(i.complete)::REAL/count(i.cartodb_id) as complete_pct,
  count(DISTINCT i.observer_id) as observers,
  count(DISTINCT i.observer_id)::REAL/count(i.cartodb_id) as observers_pct,
  min(i.cartodb_id) as cartodb_id
FROM hgrid,
(SELECT * FROM mnwi) i
WHERE ST_Intersects(i.the_geom_webmercator, hgrid.cell)
GROUP BY hgrid.cell