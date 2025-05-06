import User from "../../models/UserSchema.js";
import bcryptjs from "bcryptjs";

export const signUpUser = async (req, res) => {
  let { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already Exists" });
  }

  const hashedPass = await bcryptjs.hash(password, 10);

  const newUser = new User({
    email: email,
    username: username,
    password: hashedPass,
    fullName: "Name 1",
  });

  await newUser.save();
  res.status(201).json({
    message: "User Created Successfully",
    user: {
      email: newUser.email,
      username: newUser.username,
    },
  });
};

export const loginUser = async (req, res) => {
  let { email, password } = req.body;
  const user = await User.findOne({ email });

  const isMatched = bcryptjs.compare(password, user.password);
  if (!user || !isMatched) {
    res.status(400).json({ message: "Invalid Username or Password" });
  } else {
    res.status(201).json({
      message: "Login Successfull",
      user
    });
  }
};
