/**
 * Writes data to a SQLite database
 *
 * @param {sqlite3} db - SQLite database
 * @param {string} table - Table to insert data in
 * @param {object} newEntry - Object where keys are columns names and values is data to be inserted
 * @returns {promise<Array>} - A promise that resolves with null when inserting in the database is successful
 */
export function writetoDB(db, table, newEntry) {
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
 * Retrives data from a SQLite database
 *
 * @param {sqlite3} db - SQLite instance
 * @param {string} table - Table to retrieve rows from
 * @param {Array} desiredColumns - Array of columns to be selected from the query
 * @param {Array} params - Columns to replace the placeholders in the prepared statement
 * @param {string} [whereClause=''] - Optional SQL statements to retrieve data from the database
 * @returns {promise<Array>} - A promise that resolves with an array of retrieved rows
 */
export function retrieveFromDB(db, table, params, desiredColumns, whereClause = '') {
    const sql = `SELECT ${desiredColumns.join(", ")} FROM ${table} ${whereClause}`;

    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

/**
 * Adjust the status.
 *
 */
export function adjustStatus (db, table, params) {
    const fields = Object.keys(params); // Assuming status is an object with field-value pairs
    const placeholders = fields.map(field => `${field} = ?`).join(", ");
    const values = Object.values(params);

    const sql = `UPDATE ${table} SET ${placeholders} WHERE user_id = ?`;

    return new Promise((resolve, reject) => {
        db.run(sql, [...values], (err) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        });
    });
};