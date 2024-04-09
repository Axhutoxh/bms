const { makePayment, bookShow, getBookings } = require("../controller/bookingController");
const authMiddleware = require("../middlewares/authMiddleware");


const router = require("express").Router();

router.post("/make-payment", authMiddleware,makePayment );

router.post("/book-show", authMiddleware,bookShow );

router.get("/get-bookings/", authMiddleware,getBookings );

module.exports = router;