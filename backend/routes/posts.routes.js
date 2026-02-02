import { Router } from "express";
import { activecheck } from "../controllers/posts.controllers.js";





const router = Router();

router.route('/').get(activecheck);

export default router;