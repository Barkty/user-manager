import { Router } from "express";
import workerRoutes from "./workers.js"
import authRoutes from "./auth.js"

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send({
    message: `Hello from homepage. Check the API specification for further guidance and next steps.`,
    success: 1,
  });
});

router.use('/auth', authRoutes)
router.use('/workers', workerRoutes)

export default router;