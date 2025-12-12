import { Router } from "express";
import { mheController } from "../controllers/index.js";

const router = Router();


router.get("/mhe", mheController.findAllMhes);


export default router;