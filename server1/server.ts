import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from "./models/User.js";

mongoose
  .connect(
    "mongodb+srv://dennizyilmaz:ipbdj4bVo6ShHyay@cluster0.imtbs3g.mongodb.net/labb3?retryWrites=true&w=majority"
  )
  .then(() => console.log("Ansluten till databasen"))
  .catch((err) => console.error("Kunde inte ansluta till databasen.", err));

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post("/api/users/create", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Användarnamnet är redan taget." });
    }

    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: "Användaren har skapats." });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.put("/api/users/change", async (req: Request, res: Response) => {
  const { username, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: "Användaren hittades inte" });
    }

    if (user.password !== currentPassword) {
      return res
        .status(403)
        .json({ message: "Nuvarande lösenord är felaktigt" });
    }

    user.password = newPassword;
    await user.save();
    res.status(201).json({ message: "Lösenord ändrat" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.delete(
  "/api/users/delete:username",
  async (req: Request, res: Response) => {
    const { username } = req.params;

    try {
      const user = await User.findOneAndDelete({ username: username });
      if (!user) {
        return res.status(404).json({ message: "Användare hittades inte" });
      }

      res.status(201).json({ message: "Användaren har tagits bort" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
);

app.get("/api/users/get", async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.listen(port, () => {
  console.log(`Server lyssnar på port ${port}`);
});
