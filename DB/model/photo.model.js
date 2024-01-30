import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
    title: String,
    img: String,
    images: [{
        type: String
    }]
},{timestamps: true})

photoSchema.post('init', function(doc) {
    doc.img = process.env.BASE_URL+doc.img
})

export const photoModel = mongoose.model('photo',photoSchema)