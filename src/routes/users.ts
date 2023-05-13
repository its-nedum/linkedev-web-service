import { Router } from "express";
import controller from "../controllers/UsersController";
import middlewares from "../middlewares";

const router = Router();

router
    .route("/users")
    .get(controller.findAll)
    .post(middlewares.validateToken, controller.profile);

router
    .route("/users/:id")
    .get(controller.findOne)
    .patch(middlewares.validateToken, controller.profile)
    .delete(middlewares.validateToken, controller.destroy);

router
    .route("/register")
    .post(controller.register);

router
    .route("/login")
    .post(controller.login);

export default router;