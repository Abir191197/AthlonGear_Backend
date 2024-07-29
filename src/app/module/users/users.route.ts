import express from "express";
import authVerify from "../../middlewares/authVerify";
import { USER_ROLE } from "./user.constant";
import { userControllers } from "./users.controller";
const router = express.Router();


router.get(
  "/me",
  authVerify(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.counsellor),
  userControllers.findUser
);

router.put(
  "/me",
  authVerify(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.counsellor),
  userControllers.updatedUser
);




export const UserRoutes = router;