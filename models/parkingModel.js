import mongoose from "mongoose";

const parkingSchema=new mongoose.Schema({
    spotNumber:{
        type: String,
        required: true,
        unique: true
    },
    zone:{
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    vehicleNumber: {
        type: String,
        default: null
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("ParkingSpots", parkingSchema);