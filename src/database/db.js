import fs from 'fs';
import sqlite3 from 'sqlite3';

const dbPath = "./src/database/performance.db";

const createDbConnection = (table) => {
    return new Promise((resolve, reject) =>  {
        let db;

        if (fs.existsSync(dbPath)) {
            db = new sqlite3.Database(dbPath, (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='${table}'`, (err, row) => {
                    if (err) {
                        reject(err)
                        return;
                    }

                    if (!row) {
                        createTables(db, table)
                            .then(() => resolve(db))
                            .catch(reject);
                    } else{
                        resolve(db);
                    }
                });
            });
        } else {
            db = new sqlite3.Database(dbPath, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                createTables(db)
                    .then(() => resolve(db))
                    .catch(reject);
                resolve(db);
            });
        }
    });
};

/**
 *
 * This function creates the table to keep goals.
 * @param {sqlite3} db - SQLite database instance
 */

function createTables(db, table) {
    return new Promise((resolve, reject) => {
        if (table === 'goals') {
            db.exec(
                `
                CREATE TABLE IF NOT EXISTS ${table} (
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
                );`,
                (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        }

        if (table === 'notes') {
            db.exec(
                `
                CREATE TABLE IF NOT EXISTS ${table} (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    goal_id TEXT NOT NULL,
                    user_id TEXT NOT NULL,
                    notes TEXT NOT NULL,
                    FOREIGN KEY (goal_id) REFERENCES goals(id)
                );`,
                (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        }
    });
}

export default createDbConnection;