// const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

// const workHistory = new Schema(
//   {
//     of_user: {
//       type: Schema.Types.ObjectId,
//       require: true,
//       unique: true,
//     },
//     work_history: [
//       {
//         job_title: {
//           type: String,
//         },
//         employeer: {
//           type: String,
//         },
//         city: {
//           type: String,
//         },
//         country: {
//           type: String,
//         },
//         start_date: {
//           type: String,
//         },
//         end_date: {
//           type: String,
//         },
//         currently_working: {
//           type: Number,
//           default: 0,
//         },
//         description: {
//           type: String,
//         },
//       },
//     ],
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.Model("work_history", workHistory);
