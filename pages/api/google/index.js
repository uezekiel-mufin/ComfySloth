import db from "../../../utils/db";
import User from "../../../components/Models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") return;

  const { userName, email, isAdmin, picture } = req.body;

  await db.connect();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(201).send("welcome");
    return;
  }

  const newUser = new User({
    name: userName,
    email,
    isAdmin,
    picture,
  });

  const user = await newUser.save();
  await db.disconnect();
  res.send(user);
}
