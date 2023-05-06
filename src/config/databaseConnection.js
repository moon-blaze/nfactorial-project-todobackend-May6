const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Successfully connected to the database");
})
.catch((err) => {
    console.log("Did not connect to the database" + err);
})