
/**
 *
 * @param {*} db
 * @param {*} table
 * @param {*} newEntry: object
 * @returns
 */
const writetoDB = (db, table, newEntry) => {
    const fields = Object.keys(newEntry);
    const values = Object.values(newEntry);
    const placeholders = fields.map(_field => "?").join(", ");

    const sql = `INSERT INTO ${table} (${fields.join(", ")}) VALUES (${placeholders})`;

    return new Promise((resolve, reject) => {
        db.run(sql, values, (error) => {
            if (error) {
                reject(error)
            } else {
                resolve();
            }
        });
    });
};

/**
 *
 * @param {*} db: SQLite instance
 * @param {*} table: table to retrieve rows from
 * @param {*} desiredColumns: array of columns to be selected from the query.
 * @param {*} params: columns/values to replace the placeholders in the prepared statement.
 */

const retrievefromDB = (db, table, params, desiredColumns, whereClause = '') => {
    const sql = `SELECT ${desiredColumns.join(", ")} FROM ${table} ${whereClause}`;
    const paramsQuery = [params];

    return new Promise((resolve, reject) => {
        db.prepare(sql, (error, stmt) => {
            if (error) {
                reject(error);
            } else {
                if (!stmt) {
                    reject(new Error("Statement object is undefined."));
                } else {
                    stmt.run(paramsQuery, (error, rows) => {
                        if (error) {
                            reject(error);
                        } else {
                            const allGoals = [];
                            try {
                                rows.forEach((row) => {
                                    allGoals.push(row);
                                });
                                resolve(allGoals);
                            } catch (error) {
                                reject(error);
                            }
                        }
                    });
                }
            }
        });
    });
};


export {
    writetoDB,
    retrievefromDB
};