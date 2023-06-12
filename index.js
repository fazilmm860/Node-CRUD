const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const bodyParser = require('body-parser')

const env = require('dotenv');
env.config();

const app = express();

app.use(cors({ origin: true }))

const dburl = process.env.DB_URL //"mongodb://0.0.0.0:27017/new";

mongoose.connect(dburl, { useNewUrlParser: true });
const con = mongoose.connection;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json()) body parser is used when express is not working

try {
    con.on("open", () => {
        console.log("mongoDB Connected");
    })
} catch (error) {
    console.log("Error:" + error);
}
const port = process.env.PORT //3030;
 
app.get('/',(req,res)=>{
    res.send("HI I AM FAZIL FROM CALICUT!!!!!!")
})

const studentRouter = require('./routes/student');
app.use("/students", studentRouter);

const gradeRouter = require('./routes/gradeRouter')
app.use("/grades", gradeRouter)

app.listen(port, (req, res) => {
    console.log(`PORT:${port}`);
})