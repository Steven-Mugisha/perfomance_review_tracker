import fs from 'fs';
import sqlite3 from 'sqlite3';

const dbPath = "./src/database/performance.db";

const createDbConnection = () => {
    return new Promise((resolve, reject) =>  {
        let db;

        if (fs.existsSync(dbPath)) {
            db = new sqlite3.Database(dbPath, (error) => {
                if (error) {
                    reject(error);
                    return;
                }

                db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='goals'", (err, row) => {
                    if (err) {
                        reject(error)
                        return;
                    }

                    if (!row) {
                        createTable(db);
                    }
                    resolve(db)
                });
            });
        } else {
            db = new sqlite3.Database(dbPath, (error) => {
                if (error) {
                    reject(error);
                    return;
                }
                createTable(db);
                resolve(db);
            });
        }
    });
};

/**
 * Creates a table in the database
 * @param {sqlite3} db - SQLite database instance
 */

function createTable(db) {
    db.exec(
      `
      CREATE TABLE IF NOT EXISTS goals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        start_date DATE,
        target_date DATE,
        priority INTEGER NOT NULL CHECK (priority >= 1 AND priority <= 3),
        status TEXT NOT NULL CHECK (status IN ('Active', 'Completed', 'Failed')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );`
    );
};

export default createDbConnection;