// import { nanoid } from 'nanoid'
import createDbConnection from "../database/db.js"
import { writetoDB } from "../utils/dbUtils.js"

const createGoal = async (newGoal) => {
    const goalToInsert = {
        ...newGoal,
        // goal_id: nanoid(),
        created_at: new Date().toLocaleString("en-US", { timeZone: "UTC"}),
        updated_at: new Date().toLocaleString("en-US", { timeZone: "UTC"}),
    }

    try {
        let table = 'goals';
        const db = await createDbConnection(table);
        await writetoDB(db, "goals", goalToInsert);

        return goalToInsert

    } catch(err) {
        console.error(`Error connecting to database: ${error}`)
    }
};

const addNotes =  async (notes) => {
    try {
        let table = 'notes';
        const db = await createDbConnection(table);
        await writetoDB(db, "notes", notes)

    } catch (err) {

    }
};

// update a certain goals fields: description, priority, status, and all other that goes along like updated_at

export default {
    createGoal,
    addNotes
 };