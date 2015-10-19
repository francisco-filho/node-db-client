SELECT table_catalog, table_schema, table_name
FROM information_schema.tables
WHERE
table_type = 'BASE TABLE' and 
table_catalog='portal' AND table_schema NOT IN ('pg_catalog','information_schema')
ORDER BY 1, 2, 3
