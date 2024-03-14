import { nanoid } from 'nanoid'
import performanceModel from "../models/db.js"

const createGoal = async (newGoal) => {
    const goalToInsert = {
        ...newGoal,
        _id: nanoid(),
        created_at: new Date().toLocaleString("en-US", { timeZone: "UTC"}),
        updated_at: new Date().toLocaleString("en-US", { timeZone: "UTC"}),
    }

    try {
        let goals = new performanceModel(goalToInsert);
        await goals.save();

    } catch(err) {
        console.error(`Error connecting to database: ${err.message}`)
    }
};

// const addNotes =  async (notes) => {

//     try {
//         let table = 'notes';
//         const db = await createDbConnection(table);
//         await writetoDB(db, "notes", notes)

//     } catch (err) {
//         console.error(`Error adding a note to a goal ${err.message}`);
//     }
// };

// const changeStatus = async (adjStatus) => {

//     try {
//         let table = 'goals';
//         const db = await createDbConnection(table);
//         await adjustStatus(db, table, adjStatus)

//     } catch(err) {
//         console.error(`Error adjusting the goal status ${err.message}`);
//     }
// }

export default {
    createGoal,
    // addNotes,
    // changeStatus
 };