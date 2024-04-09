const Theatre = require('../model/theatreModel')
const Show = require('../model/showModel')

const addTheatre = async (request, response) => {
    try {
      const newTheatre = new Theatre(request.body);
      await newTheatre.save();
      response.status(200).send({
        success: true,
        message: "Theatre added successfully"
      });
    } catch (err) {
      response.status(500).send({
        success: false,
        message: err.message
      });
    }
  }

  const getAllTheatre = async (request, response) => {
    try {
      const theatres = await Theatre.find().populate("owner");
      response.send({
        success: true,
        message: "Theatre Fetched Successfully",
        data: theatres
      });
    } catch (err) {
      response.status(500).send({
        success: false,
        message: err.message
      });
    }
  }


  const getAllTheatreByOwner = async (request, response) => {
    try {
      const theatres = await Theatre.find({owner: request.body.owner});
      response.send({
        success: true,
        message: "Theatre Fetched Successfully",
        data: theatres
      });
    } catch (err) {
      response.status(500).send({
        success: false,
        message: err.message
      });
    }
  }

  const updateTheatre =  async (request, response) => {
    try {
      await Theatre.findByIdAndUpdate(request.body.theatreId, request.body);
      response.send({
        success: true,
        message: "Theatre Updated Successfully",
      });
    } catch (err) {
      response.status(500).send({
        success: false,
        message: err.message
      });
    }
  }

  const deleteTheatre = async (request, response) => {
    try {
      await Theatre.findByIdAndDelete(request.query.theatreId);
      response.send({
        success: true,
        message: "Theatre Deleted Successfully",
      });
    } catch (err) {
      response.status(500).send({
        success: false,
        message: err.message
      });
    }
  }

  const addShow = async (request, response) => {
 
    try {
      const newShow = new Show(request.body);
      await newShow.save();
      response.status(200).send({
        success: true,
        message: "Show added successfully",
      });
    } catch (err) {
      response.status(500).send({
        success: false,
        message: err.message,
      });
    }
  }

  const getAllShowByTheatre =  async (request, response) => {
    try {
      const shows = await Show.find({
        theatre: request.body.theatreId,
      }).populate("movie");
      response.send({
        success: true,
        message: "Shows fetched successfully",
        data: shows,
      });
    } catch (err) {
      response.status(500).send({
        success: false,
        message: err.message,
      });
    }
  }

  const deleteShow = async (request, response) => {
    try {
      await Show.findByIdAndDelete(request.query.showId);
      response.send({
        success: true,
        message: "Show Deleted Successfully",
      });
    } catch (err) {
      response.status(500).send({
        success: false,
        message: err.message,
      });
    }
  }

  const getAllTheatreByMovie =    async (request, response) => {
    try {
      const { movieId, date } = request.body;

      // get all shows
      const shows = await Show.find({ movie: movieId, date })
        .populate("theatre")
        .sort({ createdAt: -1 });

      // get all unique theatres from those shows
      let uniqueTheatres = [];
      shows.forEach((show) => {
        const theatre = uniqueTheatres.find(
          (theatre) => theatre._id == show.theatre._id
        );

        if (!theatre) {
          const showsForThisTheatre = shows.filter(
            (showObj) => showObj.theatre._id == show.theatre._id
          );
          uniqueTheatres.push({
            ...show.theatre._doc,
            shows: showsForThisTheatre,
          });
        }
      });

      response.send({
        success: true,
        message: "Shows fetched successfully",
        data: uniqueTheatres
      });
    } catch (err) {
      response.status(500).send({
        success: false,
        message: err.message,
      });
    }
  }

  const getShowByID =async (req, res) => {
    try {
      const show = await Show.findById(req.body.showId)
        .populate("movie")
        .populate("theatre");
        
      res.send({
        success: true,
        message: "Show fetched successfully",
        data: show,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  }

  module.exports={
    addTheatre,
    getAllTheatre,
    updateTheatre,
    deleteTheatre,
    getAllTheatreByOwner,
    addShow,getAllShowByTheatre,
    deleteShow,
    getAllTheatreByMovie,
    getShowByID
  }