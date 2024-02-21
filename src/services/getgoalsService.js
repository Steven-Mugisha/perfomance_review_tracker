import createDbConnection from "../database/db.js";
import { retrieveFromDB }  from "../utils/dbUtils.js";

export async function getAllGoals (user_id) {

    const desiredColumns = ['*']

    try {

        const db = await createDbConnection();
        const whereClause = 'WHERE user_id = ?';
        const goals = await retrieveFromDB(db, "goals", [user_id], desiredColumns, whereClause);

        return goals;

    } catch (error) {
        console.error(`Error retrieving ${user_id}'s goals`);
        throw error;

    };
};