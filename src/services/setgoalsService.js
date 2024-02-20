import createDbConnection from "../database/db.js"
import { writetoDB } from "../utils/dbUtils.js"

const createGoal = async (newGoal) => {
    const goalToInsert = {
        ...newGoal,
        created_at: new Date().toLocaleString("en-US", { timeZone: "UTC"}),
        updated_at: new Date().toLocaleString("en-US", { timeZone: "UTC"}),
    }

    try {
        const db = await createDbConnection();
        await writetoDB(db, "goals", goalToInsert);

        return goalToInsert

    } catch(error) {
        console.error(`Error connecting to database: ${error}`)
    }
};

// update a certain goals fields: description, priority, status, and all other that goes along like updated_at

export default {
    createGoal
 };