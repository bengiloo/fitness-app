const mongoose = require('mongoose');
const { Schema } = mongoose;

const mealSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  mealPlanData: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Meal', mealSchema);
