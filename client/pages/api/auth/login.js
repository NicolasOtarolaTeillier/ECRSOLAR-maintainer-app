import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export default function loginHandler(req, res) {
  const { email, password } = req.body;

  if (email === "admin@admin.com" && password === "admin") {
    const token = jwt.sign(
      {
        email: "admin@admin.com",
        username: "admin",
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      },
      "secret"
    );

    const serialized = serialize("appEcrsolarToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7,
      path: "/",
    });

    // Set the 'Set-Cookie' header
    res.setHeader("Set-Cookie", serialized);

    // Send the response with the JSON payload
    return res.json({ data: "login successfully" });

  }

  return res.status(401).json({ error: "Invalid email or password" });
}
