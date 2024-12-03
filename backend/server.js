const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // You can define your destination folder for uploads
  },
  filename: function (req, file, cb) {
    const str = file.originalname;
    const result = str.replace(/\.(jpg|jpeg|png|gif)$/, "");

    cb(null, result + Date.now() + path.extname(file.originalname)); // Create a unique file name
  },
});

const upload = multer({ storage: storage });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST","DELETE"],
  })
);
app.use(cookieParser());

// Function to generate 5-character alphanumeric ID
function generateId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }
  
  return id;
}

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "property_manage",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Token is not provided" });
  } else {
    jwt.verify(token, "1234", (err, decoded) => {
      if (err) {
        return res.json({ Error: "Token is not okay" });
      } else {
        req.userId = decoded.userId;
        
        next();
      }
    });
  }
};

app.get("/", verifyUser, (req, res) => {
  return res.json({ Status: "Success", email: req.email });
});



app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const userId = generateId();

  const checkUser = "SELECT * FROM userinfo WHERE uemail=?";
  db.query(checkUser, [req.body.email], (err, data) => {
    if (err) return res.json({ Error: "Register error in Server" });
    if (data.length > 0) {
      return res.json({ Status: "Email already registered" });
    } else {
      const sql =
        "INSERT INTO userinfo(`userId`,`uname`,`uemail`,`upassword`) VALUES(?,?,?,?)";

      db.query(sql, [userId,name, email, password], (err, result) => {
        if (err)
          return res.json({ Error: "Error Inserting data Error in Server" });
        if (result) {
          return res.json({ Status: "Success" });
        } else {
          return res.json({ Error: "Error Inserting data in Server" });
        }
      });
    }
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM userinfo WHERE uemail = ?";
  db.query(sql, [email], (err, data) => {
    const userId = data[0].userId;
    if (err) return res.json({ Error: "Login error in Server" });
    if (data.length > 0) {
      const token = jwt.sign({ userId }, "1234", { expiresIn: "1d" });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Ensure it's true in production with HTTPS
        maxAge: 24 * 60 * 60 * 1000,
        path: "/", // Ensure the cookie is available for all paths
        domain: "localhost", // Ensure the correct domain is used if running locally
      }); // 1 hour cookie
      console.log(token);
      console.log(userId);
      return res.json({ Status: "Success" });
    } else {
      return res.json({ Error: "No email existed" });
    }
  });
});

app.post("/addProperty",verifyUser, upload.single("productImage"), (req, res) => {
  const { productName, address, date, propertyType } = req.body;
  const productImage = req.file ? req.file.filename : null;
  console.log(productName);
  console.log(address);
  console.log(date);
  console.log(propertyType);
  console.log(productImage);
  const userId = req.userId;
  console.log(userId);

  const sql =
    "INSERT INTO property(`userId`,`pname`,`address`,`propertyType`,`date`,`pImage`) VALUES(?,?,?,?,?,?)";
  db.query(
    sql,
    [userId,productName, address,  propertyType,date, productImage],
    (err, result) => {
      if (err)
        return res.json({ Error: "Error Inserting data Error in Server" });
      if (result) {
        return res.json({
          Status: "Success",
          message: "Property added successfully!",
        });
      } else {
        return res.json({ Error: "Error Inserting data in Server" });
      }
    }
  );
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/getProperty', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ Error: "Token is not provided" });
  }

  jwt.verify(token, "1234", (err, decoded) => {
    if (err) {
      return res.status(401).json({ Error: "Token is not valid" });
    } else {
      const userId = decoded.userId;

      const sql = "SELECT * FROM userinfo INNER JOIN property ON userinfo.userId = property.userId WHERE userinfo.userId = ?";
      db.query(sql, [userId], (err, result) => {
        if (err) return res.status(500).json({ Error: "Error fetching data from database" });

        if (result.length === 0) {
          return res.status(404).json({ Error: "No matching properties found" });
        } else {
          return res.json({ Status: "Success", data: result });
        }
      });
    }
  });
});

// pending updates
app.get('/getService', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ Error: "Token is not provided" });
  }

  jwt.verify(token, "1234", (err, decoded) => {
    if (err) {
      return res.status(401).json({ Error: "Token is not valid" });
    } else {
      const userId = decoded.userId;

      const sql = "SELECT * FROM userinfo INNER JOIN property ON userinfo.userId = property.userId INNER JOIN service ON property.userId = service.userId AND property.pname = service.propertyName WHERE userinfo.userId = ?";
      db.query(sql, [userId], (err, result) => {
        if (err) return res.status(500).json({ Error: "Error fetching data from database" });

        if (result.length === 0) {
          return res.status(404).json({ Error: "No matching properties found" });
        } else {
          return res.json({ Status: "Success", data: result });
        }
      });
    }
  });
});


app.post("/addService",verifyUser, (req, res) => {
  const { serviceType, serviceCost, serviceDate, propertyName } = req.body;

  const userId = req.userId;
  console.log(userId);

  const sql =
    "INSERT INTO service(`userId`,`serviceType`,`serviceCost`,`serviceDate`,`propertyName`) VALUES(?,?,?,?,?)";
  db.query(
    sql,
    [userId,serviceType, serviceCost, serviceDate, propertyName],
    (err, result) => {
      if (err)
        return res.json({ Error: "Error Inserting data Error in Server" });
      if (result) {
        return res.json({
          Status: "Success",
          message: "Property added successfully!",
        });
      } else {
        return res.json({ Error: "Error Inserting data in Server" });
      }
    }
  );
});

//delete from property Table
app.delete('/deleteProperty/:id', (req, res) => {
  const { id } = req.params;
  
  // Check if ID is valid and exists
  const checkSql = "SELECT * FROM property WHERE id = ?";
  db.query(checkSql, [id], (err, result) => {
    if (err) {
      console.error("Error checking property existence:", err);
      return res.status(500).json({ error: "Database error occurred while checking property." });
    }
    
    if (result.length === 0) {
      return res.status(404).json({ error: "Property not found." });
    }

    // Proceed with deletion
    const deleteSql = "DELETE FROM property WHERE id = ?";
    db.query(deleteSql, [id], (err, result) => {
      if (err) {
        console.error("Error deleting property:", err);
        return res.status(500).json({ error: "Error deleting data from database." });
      }
      
      return res.json({ message: "Property deleted successfully." });
    });
  });
});


app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Logged Out" });
});

app.listen(8081, (err) => {
  if (err) throw err;
  console.log(`Server is running on http://localhost:${8081}`);
});
