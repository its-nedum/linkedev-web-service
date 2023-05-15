import { Router } from "express";
import controller from "../controllers/UsersController";

const router = Router();

router
    .route("/users")
    .get(controller.findAll)
    .post(controller.profile);

router
    .route("/users/:id")
    .get(controller.findOne)
    .patch(controller.profile)
    .delete(controller.destroy);

router
    .route("/register")
    .post(controller.register);

router
    .route("/login")
    .post(controller.login);

export default router;