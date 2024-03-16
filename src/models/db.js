import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();
const { DATABASE_URL } = process.env;

const Schema = mongoose.Schema;

// The main schema (Performance Schema).
const performanceSchema = new Schema({
    _id: {
        required: true,
        type: String
    },
    user_name: {
        required: true,
        type: String
    },
    title: String,
    description: String,
    start_data: Date,
    target_data: Date,
    priority: {
        type: Number,
        enum: [1, 2, 3]
    },
    create_at: String,
    updated_at: { type: Date, default: Date.now },
    notes: [String],
})

// Connect to MongoDB.
export async function connectDB() {
    try {
        await mongoose.connect(DATABASE_URL);
        console.log('Connected to MongoDB...')

    } catch (err) {
        console.error(`FAILED to connect to MongoDB...`);
        throw err
    }
}

const performanceModel = mongoose.model('performanceModel', performanceSchema);

export default performanceModel;