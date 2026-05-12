import express from "express";
import { createSpot, fetchSpots, updateSpot, deleteSpot } from "../controllers/parkingController.js";

const route = express.Router();

route.post("/create", createSpot);
route.get("/getAll", fetchSpots);
route.put("/update/:id", updateSpot);
route.delete("/delete/:id", deleteSpot);

export default route;