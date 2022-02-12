const mongoose = require("mongoose")

const point = mongoose.model("Point", mongoose.Schema({
    point: {
        type: String,
        maxlenght: 255,
        required: true
    }
}))


exports.Point = point;