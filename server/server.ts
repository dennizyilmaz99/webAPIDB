import express from "express";
import mongoose from "mongoose";
const cors = require("cors");
import User from "./models/User";

mongoose
  .connect(
    "mongodb+srv://dennizyilmaz:ipbdj4bVo6ShHyay@cluster0.imtbs3g.mongodb.net/labb3?retryWrites=true&w=majority"
  )
  .then(() => console.log("Ansluten till MongoDB"))
  .catch((err) => console.error("Kunde inte ansluta till MongoDB", err));

const app = express();
const port = 3001; // Välj en lämplig port

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/users", async (req, res) => {
  try {
    // Skapa en ny användare med datan från request body
    const newUser = new User(req.body);
    // Spara användaren i databasen
    await User.create(req.body);
    // Skicka tillbaka den sparade användaren som svar
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.listen(port, () => {
  console.log(`Server lyssnar på port ${port}`);
});
