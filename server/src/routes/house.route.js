import { Router } from "express";
import {
  getAllHouses,
  getHouseById,
} from "../controllers/house.controllers.js";


const route = Router();

route.get("/get-all-houses", getAllHouses);
route.get("/get-house", getHouseById);


export default route;
