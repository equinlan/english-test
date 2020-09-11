/*
 Items must be active, cannot have timed out, and must be English.
*/
SELECT ordinal,
    user_id,
    item_id,
    correct_response
FROM (
        SELECT completedtestitem.id AS ordinal,
			completedtestitem.user_id,
			completedtestitem.item_id,
            completedtestitem.correct_response,
            completedtestitem.timed_out,
            ROW_NUMBER() OVER (
                PARTITION BY completedtestitem.user_id, completedtestitem.item_id
                ORDER BY completedtestitem.id
            ) AS RowNum
        FROM testings_completedtestitem AS completedtestitem
            JOIN testings_testitem AS testitem ON testitem.id = completedtestitem.item_id
            AND testitem.active IS TRUE
            AND testitem.language_id = 1
    ) AS table1
WHERE RowNum = 1
AND timed_out IS FALSE
ORDER BY ordinal;