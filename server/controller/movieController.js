const Movie = require("../model/movieModel");


const addMovie = async (request, response) => {
    try {
      const newMovie = new Movie(request.body);
      await newMovie.save();
      response.status(200).send({
        success: true,
        message: "Movie added successfully"
      });
    } catch (err) {
      response.status(500).send({
        success: false,
        message: err.message
      });
    }
  }

const getAllMovies = async (_, response) => {
    try {
      const movies = await Movie.find();
      response.send({
        success: true,
        message: "Movies Fetched Successfully",
        data: movies
      });
    } catch (err) {
      response.status(500).send({
        success: false,
        message: err.message
      });
    }
  }

  const updateMovie =  async (request, response) => {
    try {
      await Movie.findByIdAndUpdate(request.body.movieId, request.body);
      response.send({
        success: true,
        message: "Movie Updated Successfully",
      });
    } catch (err) {
      response.status(500).send({
        success: false,
        message: err.message
      });
    }
  }

  const deleteMovie = async (request, response) => {
    try {
      await Movie.findByIdAndDelete(request.query.movieId);
      response.send({
        success: true,
        message: "Movie Deleted Successfully",
      });
    } catch (err) {
      response.status(500).send({
        success: false,
        message: err.message
      });
    }
  }

  const getMovieById = async (request, response) => {
    try {
      const movie = await Movie.findById(request.params.movieId);
      if (movie) {
        response.status(200).send({
          success: true,
          message: "Movie Fetched Successfully",
          data: movie
        });
      } else {
        response.status(404).send({
          success: false,
          message: "Movie Not found"
        });
      }
    } catch (err) {
      response.status(500).send({
        success: false,
        message: err.message
      });
    }
  }

  module.exports={addMovie,getAllMovies,updateMovie,deleteMovie,getMovieById}