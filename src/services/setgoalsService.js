// import { nanoid } from 'nanoid'
import createDbConnection from "../database/db.js"
import { writetoDB, adjustStatus } from "../utils/dbUtils.js"

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
        console.error(`Error connecting to database: ${err.message}`)
    }
};

const addNotes =  async (notes) => {

    try {
        let table = 'notes';
        const db = await createDbConnection(table);
        await writetoDB(db, "notes", notes)

    } catch (err) {
        console.error(`Error adding a note to a goal ${err.message}`);
    }
};

const changeStatus = async (adjStatus) => {

    try {
        let table = 'goals';
        const db = await createDbConnection(table);
        await adjustStatus(db, table, adjStatus)

    } catch(err) {
        console.error(`Error adjusting the goal status ${err.message}`);
    }
}

export default {
    createGoal,
    addNotes,
    changeStatus
 };