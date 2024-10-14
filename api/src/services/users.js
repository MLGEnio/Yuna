import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../db/models/user.js";

export const createUser = async ({
  username,
  email,
  password,
  confirmPassword,
}) => {
  // Hash the passwords with await
  const hashedPassword = await bcrypt.hash(password, 10);

  // Compare plain text passwords
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  try {
    // Attempt to create and save the user
    const user = new User({ username, email, password: hashedPassword });
    return await user.save();
  } catch (error) {
    // Check if the error is related to unique constraint violations
    if (error.code === 11000) {
      throw new Error("Username or email already exists");
    }
    // Throw a more general error for other cases
    throw new Error("Failed to create the user!");
  }
};

export const loginUser = async ({ username, password }) => {
  const user = await User.findOne({
    $or: [{ username: username }, { email: username }],
  });
  if (!user) {
    throw new Error("invalid username");
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error("invalid password");
  }
  const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};
