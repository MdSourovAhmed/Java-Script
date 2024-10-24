const exp = require("express");
const mongoose = require("mongoose");

main().catch((err) => {
  console.log(err);
});

async function main() {
  await mongoose.connect("mongodb://localhost:27017/user");
  console.log("Db Connected");
}
const server = exp();

const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const User = mongoose.model("User", UserSchema);

server.get("/findall", async (req, res) => {
  const data = await User.find({});
  res.json(data);
});

server.get("/user1", async (req, res) => {
  const user1 = new User();
  user1.name = "Sourov";
  user1.age = 24;
  const data = await user1.save();
  //   const UserData = await User.find({});
  console.log(data);
});

server.listen(8080, () => {
  console.log("server started");
});
