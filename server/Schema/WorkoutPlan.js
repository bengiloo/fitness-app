const mongoose = require("mongoose");
const { Schema } = mongoose;

const workoutPlanSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    plan: { type: Object, required: true },
    createdAt: { type: Date, default: Date.now, },
});

module.exports = mongoose.model("WorkoutPlan", workoutPlanSchema);
