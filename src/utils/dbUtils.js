
const writetoDB = (db, table, newEntry) => {
    const fields = Object.keys(newEntry);
    const values = Object.values(newEntry);
    const placeholders = fields.map(_field => "?").join(", ");

    const sql = `INSERT INTO ${table} (${fields.join(", ")}) VALUES (${placeholders})`;

    return new Promise((resolve, reject) => {
        db.run(sql, values, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve();
            }
        });
    });
};

export default { writetoDB };