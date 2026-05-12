import Parking from "../models/parkingModel.js";

export const createSpot = async (req, res) => {
    try {
        const parkingData = new Parking(req.body);
        const { spotNumber } = parkingData;
        const spotExist = await Parking.findOne({ spotNumber });
        if (spotExist) {
            return res.status(400).json({ message: "Parking spot already exists." });
        }
        const savedSpot = await parkingData.save();
        res.status(200).json(savedSpot);
    } 
    catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
}

export const fetchSpots = async (req, res) => {
    try {
        const spots = await Parking.find();
        if (spots.length === 0) {
            return res.status(404).json({ message: "No parking spots found." });
        }
        res.status(200).json(spots);
    } 
    catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
}

export const updateSpot = async (req, res) => {
    try {
        const id = req.params.id;
        const spotExist = await Parking.findById(id);
        if (!spotExist) {
            return res.status(404).json({ message: "Spot not found." });
        }
        const updatedSpot = await Parking.findByIdAndUpdate(id, req.body, { new: true });
        res.status(201).json(updatedSpot);
    } 
    catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
}

export const deleteSpot = async (req, res) => {
    try {
        const id = req.params.id;
        const spotExist = await Parking.findById(id);
        if (!spotExist) {
            return res.status(404).json({ message: "Spot not found." });
        }
        await Parking.findByIdAndDelete(id);
        res.status(201).json({ message: "Spot deleted successfully." });
    } 
    catch (error) {
        res.status(500).json({ error: "Internal Server Error." });
    }
}