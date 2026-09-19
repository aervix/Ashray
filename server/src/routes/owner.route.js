import { Router } from "express";
import {
  createHouse,
  removeHouse,
  updateHouse,
} from "../controllers/owner.controllers.js";

const route = Router();

route.get("/create-houses", createHouse);
route.get("/update-house", updateHouse);
route.get("/remove-house/id", removeHouse);

export default route;
