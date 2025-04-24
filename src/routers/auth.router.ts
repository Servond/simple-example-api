import { Router } from "express";
import { RegisterController, LoginController, GetAllController } from "../controllers/auth.controller";
import { VerifyToken, EOGuard } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", RegisterController);
router.post("/login",  LoginController);

router.get("/users", VerifyToken, EOGuard, GetAllController)

export default router;