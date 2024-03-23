import express from "express";
import { getHome } from "../controllers/index.js";
const router_id = express.Router();
router_id.get('/', getHome);
export default router_id;

