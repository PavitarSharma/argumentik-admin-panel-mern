import mongoose from "mongoose"

const dataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: 3
    },
    contact: {
        type: String,
        required: [true, "Contact is required"],
    }
})

const Data = mongoose.model("Data", dataSchema)

export default Data