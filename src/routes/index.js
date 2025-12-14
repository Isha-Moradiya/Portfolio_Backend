import { Router } from "express";

import healthCheckRoute from "./healthCheckRoutes.js";
import authRoute from "./authRoutes.js";
import userRoute from "./userRoutes.js";
import skillRoute from "./skillRoutes.js";
import workRoute from "./workRoutes.js";
import experienceRoute from "./experienceRoutes.js";
import contactRoute from "./contactRoutes.js";

const router = Router();

router.use("/", healthCheckRoute);
router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/skill", skillRoute);
router.use("/work", workRoute);
router.use("/experience", experienceRoute);
router.use("/contact", contactRoute);

export default router;
