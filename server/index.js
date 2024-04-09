const express = require('express');
const cluster = require('node:cluster');
const os = require('os')
const path = require("path");

const cors = require('cors');
const PORT = 3000
const totalCpu = os.cpus().length


if(cluster.isPrimary) {
    for(let i = 0; i < 1; i++) {
        cluster.fork()
    }

}else{
  
    const app = express()
    require('dotenv').config()
    const dbConfig = require('./config/dbConfig')
    const userRoute = require('./routes/userRoutes')
    const moviesRoute = require('./routes/movieRouter')
    const theatreRoute = require('./routes/theatreRouter')
    const bookingRoutes = require('./routes/bookingRouter')
    
    
    app.use(cors())
    app.use(express.json())
    
    app.use('/api/user',userRoute)
    app.use('/api/movie',moviesRoute)
    app.use('/api/theatre',theatreRoute)
    app.use("/api/bookings", bookingRoutes);

    if (process.env.NODE_ENV === "production") {
        app.use(express.static(path.join(__dirname, "/client/build")));
        app.get("*", (req, res) => {
          res.sendFile(path.join(__dirname, "client", "build", "index.html"));
        });
      }
    
    app.listen(PORT , ()=>{
        console.log('listening on port',PORT)
    })
}

