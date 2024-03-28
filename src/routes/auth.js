import express from "express";
import { signIn, signUp } from "../controllers/auth.js";
const router_auth = express.Router();
router_auth.post('/signup', signUp);
router_auth.post('/signin', signIn);
export default router_auth;