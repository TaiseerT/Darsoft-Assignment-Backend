import express from "express";
import {
  createNews,
  deleteNews,
  showNews,
  updateNews,
} from "../controllers/news.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import {
  createNewsValidator,
  validate,
} from "../middlewares/validator.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
const newsRoutes = express.Router();
newsRoutes.get("/", verifyToken, showNews);
newsRoutes.post(
  "/create-news",
  verifyToken,
  isAdmin,
  createNewsValidator,
  validate,
  createNews
);
newsRoutes.patch("/:newsId/update-news", verifyToken, isAdmin, updateNews);
newsRoutes.delete("/:newsId/delete-news", verifyToken, isAdmin, deleteNews);

export default newsRoutes;
