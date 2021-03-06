import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Users from "../models/users.model.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await Users.findOne(email);

    console.log(existingUser);

    if (!existingUser) {
      res.status(404).json({ message: "User doesn't exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await Users.findOne(email);

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    }

    if (password !== confirmPassword) {
      res.status(400).json({ message: "Password don't match" });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const result = await Users.create({
      email,
      password: hashPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ result: result, token });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
