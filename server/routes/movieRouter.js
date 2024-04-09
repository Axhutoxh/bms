const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");

const { addMovie,getAllMovies,updateMovie,deleteMovie,getMovieById } = require("../controller/movieController")

//POST ROUTER
router.post("/add-movie", authMiddleware, addMovie);                        //Add moview

//GET ROUTER
router.get("/get-all-movies", authMiddleware,getAllMovies);                 //Get all movies
router.get("/get-movie-by-id/:movieId", authMiddleware,getMovieById );      //Get a movie by id

//PUT ROUTER
router.put("/update-movie", authMiddleware,updateMovie);                    //Update a movie

//DELETE ROUTER
router.delete("/delete-movie", authMiddleware,deleteMovie );                //Delete a movie



module.exports = router;