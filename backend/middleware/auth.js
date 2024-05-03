// app.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   if (email === "user@example.com" && password === "password") {
//     // If credentials are valid, generate a JWT token
//     const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });

//     // Send the token back to the client
//     res.json({ token });
//   } else {
//     // If credentials are invalid, return an error
//     res.status(401).json({ error: "Invalid credentials" });
//   }
// });
