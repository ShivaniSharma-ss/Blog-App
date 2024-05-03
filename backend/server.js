const express = require("express");
const PORT = 4000;
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const multer = require("multer");

// const routeProtect = require("./middleware/auth.js");

const connection = require("./connection");

const app = express();
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
// app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

const JWT_SECRET = "ABCD";

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.post("/getUserByEmail", (req, res) => {
  const { email, password } = req.body;

  connection.query(
    `SELECT * from users where email='${email}'`,
    function (err, rows, fields) {
      if (!err) {
        if (rows.length === 0) {
          res.status(200).json({ success: false, msg: "No email found" });
        } else {
          bcrypt.compare(password, rows[0].password).then((result) => {
            if (result) {
              // Passwords match, generate token
              const token = jwt.sign(
                { id: rows[0].id, username: rows[0].email, type: "user" },
                JWT_SECRET,
                { expiresIn: "2h" }
              );
              res.cookie("token", token, {
                maxAge: 2 * 60 * 1000,
                httpOnly: true,
              });
              res.status(200).json({ success: true });
            } else {
              // Passwords don't match
              res.status(200).json({ success: false, msg: "Invalid password" });
            }
          });
        }
      } else {
        res.status(500).json(err);
      }
    }
  );
});

app.post("/addUser", (req, res) => {
  const { name, email } = req.body;
  connection.query(
    `insert into users (name,email) values('${name}','${email}')`,
    function (err, rows, fields) {
      if (!err) {
        res.send(JSON.stringify(rows));
      } else {
        res.status(401).json(err);
      }
    }
  );
});

app.post("/updateUser", async (req, res) => {
  const { email, password } = req.body;
  const hash = bcrypt.hashSync(password, 5);
  connection.query(
    `update users set password='${hash}', is_verified=1 where email='${email}'`,
    function (err, rows, fields) {
      if (!err) {
        res.send(JSON.stringify(rows));
      } else {
        res.status(401).json(err);
      }
    }
  );
});

app.post("/send-email", (req, res) => {
  const email = req.query.email;

  // Create a transporter with nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "senddummymail7@gmail.com",
      pass: "pkhl ygyj pqrx loax",
    },
  });

  // Email content
  const mailOptions = {
    from: "senddummymail7@gmail.com",
    to: email,
    subject: "Welcome to Our App!",
    text: `Thank you for signing up! Here is the link to our web application: http://localhost:3000/setPassword?email=${email}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "/", { expires: new Date(0) }).send({ success: true });
});

app.post("/getBlogsByCategory", async (req, res) => {
  const { category } = req.body;

  connection.query(
    `SELECT blog.id as id,blogger.full_name,blog.category,blogger.id as blogger_id,blog.title,blog.content,blog.picture,blog.created_on from blog,blogger where category='${category}' and blog.author=blogger.id`,
    function (err, rows, fields) {
      if (!err) {
        res.status(200).json({ success: true, data: rows });
      } else {
        res.status(500).json(err);
      }
    }
  );
});

app.post("/getBlogsById", async (req, res) => {
  const { id } = req.body;

  connection.query(
    `SELECT blog.id as id,blog.title,blog.content,blog.created_on,blog.picture,blog.category,blogger.full_name,blogger.id as blogger_id from blog,blogger where blogger.id=blog.author and blog.id=${id} `,
    function (err, rows, fields) {
      if (!err) {
        res.status(200).json({ success: true, data: rows });
      } else {
        res.status(500).json(err);
      }
    }
  );
});

app.post("/getBloggerById", async (req, res) => {
  const { id } = req.body;

  connection.query(
    // `SELECT blog.id as id,blog.title,blog.content,blog.created_on,blog.picture,blog.category,blogger.full_name,blogger.occupation,blogger.profile_photo,blogger.dob,blogger.nationality,blogger.area_of_interest,blogger.id as blogger_id from blog,blogger where blogger.id=blog.author and blogger.id=${id} `,
    `SELECT * from blog WHERE blog.author =${id}`,
    function (err, rows1, fields) {
      if (!err) {
        connection.query(
          `SELECT * from blogger WHERE id=${id}`,
          (err, rows2, fields) => {
            if (!err) {
              const body = {
                success: true,
                data: {
                  ...rows2[0],
                  blogs: rows1,
                },
              };
              res.status(200).json(body);
            }
          }
        );
      } else {
        res.status(500).json(err);
      }
    }
  );
});

app.get("/getAllBlogs", async (req, res) => {
  connection.query(
    `SELECT blog.id as id,blogger.id as blogger_id,title,blogger.full_name,blog.content,blog.created_on,blog.picture,blog.category from blog,blogger where blog.author=blogger.id`,
    function (err, rows, fields) {
      if (!err) {
        res.status(200).json({ success: true, data: rows });
      } else {
        res.status(500).json(err);
      }
    }
  );
});

app.get("/getAllBloggers", async (req, res) => {
  connection.query(`SELECT * from blogger`, function (err, rows, fields) {
    if (!err) {
      res.status(200).json({ success: true, data: rows });
    } else {
      res.status(500).json(err);
    }
  });
});

app.post("/addBlog", async (req, res) => {
  let { title, content, profile, createdOn, category, author } = req.body;
  connection.query(
    `insert into blog (title, content, picture,created_on, category, author) values('${title}','${content}','${profile}','${createdOn}','${category}',${author})`,
    function (err, rows, fields) {
      if (!err) {
        res.status(200).json({ success: true, data: rows });
      } else {
        res.status(500).json(err);
      }
    }
  );
});
