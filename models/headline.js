const mongoose = require("mongoose")

const headline = mongoose.model("Headline", mongoose.Schema({
    headline: {
        type: String,
        maxlenght: 255,
        required: true
    }
}))


exports.Headline = headline;