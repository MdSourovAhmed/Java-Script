const express = require("express");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/studentDB")
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("failed to connect", err);
  });

const studentSchema = new mongoose.Schema({
  name: String,
  ID: Number,
  Session: Number,
  Dept: String,
});

const student = mongoose.model("student", studentSchema);

const server = express();
server.set("view engine", "ejs");
server.use(express.json());

server.get("/students", async (req, res) => {
  const doc = await student.find();
  // res.status(201).json(doc);
  res.send({message:"hello"});
});

server.post("/students", async (req, res) => {
  try {
    const { name, ID, Session, Dept } = req.body;

    const studentInfo = new student({ name, ID, Session, Dept });
    const saveStudent = await studentInfo.save();
    res.status(201).json({
      message: "Student data saved successfully",
      student: saveStudent,
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500).json({
      message: "Eroor saving student data",
      error: err,
    });
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  {
    console.log(`server started on port ${PORT}`);
  }
});
