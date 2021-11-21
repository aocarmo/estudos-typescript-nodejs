import { Router } from "express";

import { categorieRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";

const router = Router();

router.use("/categories", categorieRoutes);
router.use("/specifications", specificationsRoutes);

export { router };
