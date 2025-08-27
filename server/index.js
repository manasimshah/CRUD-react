const express = require("express");
const cors = require("cors");
const dbConnection = require("./database");
const userRouter = require("./routes/user.routes");

dbConnection();

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello");
});
app.use('/user', userRouter);

app.listen(8000, () => {
    console.log('Port listening on 8000');
    
});

