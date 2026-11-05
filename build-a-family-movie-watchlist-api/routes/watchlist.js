import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeModification } from "../middleware/authorize.js";
import { getWatchlist, addMovie, updateMovie, deleteMovie } from "../utils/db.js";
const router = express.Router();
router.use(authenticate);
router.get("/:userId", (req, res) => {
  const list = getWatchlist(Number(req.params.userId));
  return list ? res.status(200).json(list) : res.status(404).json({ error: "Not found" });
});
router.post("/:userId/movies", authorizeModification, (req, res) => {
  const movie = addMovie(Number(req.params.userId), req.body || {});
  return movie ? res.status(201).json(movie) : res.status(404).json({ error: "Not found" });
});
router.put("/:userId/movies/:movieId", authorizeModification, (req, res) => {
  const movie = updateMovie(Number(req.params.userId), Number(req.params.movieId), req.body || {});
  return movie ? res.status(200).json(movie) : res.status(404).json({ error: "Not found" });
});
router.delete("/:userId/movies/:movieId", authorizeModification, (req, res) => {
  const ok = deleteMovie(Number(req.params.userId), Number(req.params.movieId));
  return ok ? res.status(200).json({ message: "Deleted" }) : res.status(404).json({ error: "Not found" });
});
export default router;
