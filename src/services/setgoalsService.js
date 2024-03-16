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
        console.error(`Error inserting a new goal: ${err.message}`);
    }
};

const getGoals = async (user_name) => {
    try {
        const goals = await performanceModel.find({ user_name: user_name }).exec();
        return goals;

    } catch (err) {
        console.error(`Error retreving from mongo: ${err.message}`);
    }

};

const addNotes = async (goalId, notes) => {

    try {
        const goal = await performanceModel.findOne({ _id: goalId }).exec();
        goal.notes.push(notes);
        await goal.save();
    } catch (err) {
        console.error(`Error adding notes to a goal: ${err.message}`);
    }
};

export default {
    createGoal,
    getGoals,
    addNotes,
    // changeStatus
 };