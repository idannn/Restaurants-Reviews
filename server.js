const express = require("express");
const connectDB = require("./config/db");
require("./models/User"); //imported one time only
require("./models/Restaurant"); //imported one time only
require("./models/Review"); //imported one time only

const app = express();

//connect to database
connectDB();

//json parser
app.use(express.json({ extended: false }));

//routes
app.use("/users", require("./routes/user")); //the prefix of the url is /users/...
app.use("/restaurants", require("./routes/restaurants")); //the prefix of the url is /users/...
app.use("/reviews", require("./routes/reviews")); //the prefix of the url is /users/...
app.use("/zomato", require("./routes/zomato"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
