import createDbConnection from "../database/db.js";
import { retrievefromDB } from "../utils/dbUtils.js";

const getAllGoals = async (user_id) => {

    const desiredColumns = ['*']

    try {
        const db = await createDbConnection();
        const whereClause = 'WHERE user_id = ?';
        const goals = await retrievefromDB(db, "goals", user_id, desiredColumns, whereClause);

        return goals;

    } catch (error) {
        console.error(`Error retrieving ${user_id}'s goals`);
        throw error;

    };
};

export default {
    getAllGoals
};