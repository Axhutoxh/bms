const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  addTheatre,
  getAllTheatre,
  getAllTheatreByOwner,
  updateTheatre,
  deleteTheatre,
  addShow,
  getAllShowByTheatre,
  deleteShow,
  getAllTheatreByMovie,
  getShowByID,
} = require("../controller/theatreController");

router.post("/add-theatre", authMiddleware, addTheatre);
router.post("/get-all-theatres-by-owner", authMiddleware, getAllTheatreByOwner);

router.get("/get-all-theatres", authMiddleware, getAllTheatre);

//PUT ROUTER
router.put("/update-theatre", authMiddleware, updateTheatre); //Update a theatre

//DELETE ROUTER
router.delete("/delete-theatre", authMiddleware, deleteTheatre); //Delete a theatre

// Shows API(s)
router.post("/add-show", authMiddleware, addShow);

router.post("/get-all-shows-by-theatre", authMiddleware, getAllShowByTheatre);

router.delete("/delete-show", authMiddleware, deleteShow);

router.post("/get-all-theatres-by-movie", authMiddleware, getAllTheatreByMovie);

router.post("/get-show-by-id", authMiddleware, getShowByID);

module.exports = router;
