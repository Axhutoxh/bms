const Booking = require("../model/bookModel");
const Show = require("../model/showModel");
const stripe = require("stripe")(process.env.stripe_key);




const makePayment  = async (req, res) => {
  const {amount} = req.body
 
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount:amount,
        currency: "INR",
      });
  
      const transactionId = paymentIntent.client_secret;
  
      res.send({
        success: true,
        message: "Payment successful",
        data: transactionId,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  }


  const bookShow = async (req, res) => {
    try {
      // save booking
      const newBooking = new Booking(req.body);
      await newBooking.save();
  
      const show = await Show.findById(req.body.show);
      // update seats
      await Show.findByIdAndUpdate(req.body.show, {
        bookedSeats: [...show.bookedSeats, ...req.body.seats],
      });
  
      res.send({
        success: true,
        message: "Show booked successfully",
        data: newBooking,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  }


  const getBookings = async (req, res) => {
    try {
      const bookings = await Booking.find({ user: req.body.userId })
        .populate("show")
        .populate({
          path: "show",
          populate: {
            path: "movie",
            model: "movies",
          },
        })
        .populate("user")
        .populate({
          path: "show",
          populate: {
            path: "theatre",
            model: "theatres",
          },
        });
  
      res.send({
        success: true,
        message: "Bookings fetched successfully",
        data: bookings,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  }

  module.exports = {makePayment,bookShow,getBookings}