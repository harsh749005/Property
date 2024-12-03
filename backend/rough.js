const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express();
const bcrypt = require('bcrypt');

app.use(express.json()); 
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your React app
  credentials: true, // Include credentials such as session cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));






// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',  
  user: 'root',       
  password: '',       
  database: 'property_manage'  
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Insert registration data route
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  console.log(`Received data: Name: ${name}, Email: ${email}, Password: ${password}`);  

  const sql1 = 'SELECT * FROM userInfo WHERE uemail = ? AND upassword = ?';
  db.query(sql1,[email,password], (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Failed to check if user already exists' });
      return;
    }
    if (result.length > 0) {
      res.status(400).json({success: false, error: 'User already exists' });
      return;
    }
    else{
      const sql = 'INSERT INTO userInfo (uname, uemail, upassword) VALUES (?, ?, ?)';
      db.query(sql, [name, email, password], (err, result) => {
        if (err) {
          console.error('Error inserting data:', err);
          res.status(500).json({ error: 'Failed to register user' });
          return;
        }
        const token = jwt.sign({ uname:name, email: email },"my-key",{expiresIn:'1d'});
        res.cookie('token',token);
        const tokenget = req.cookies.token;
        res.json({
          success: true,
          message: 'User registered successfully',
          tokenr: tokenget
        }); 
      });
    }
  });


});


const verifyUser = (req,res,next) => {
  
  const token = req.cookies.token;
  
  if (!token) {
    return res.json({message:"We need a token"});
  }
  else{
    jwt.verify(token,"my-key",(err, decoded) => {
      if(err){
        return res.json({message:"Token is not valid"});
      }
      else{
        req.email = decoded.email;
        req.uname = decoded.uname;
        next();
      }
    })
  }
}

app.get('/', verifyUser,(req,res)=>{
  return res.json({success:true,email:req.email,uname:req.uname});
})



app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  console.log(`Received data: Email: ${email}, Password: ${password}`);

  if (email && password) {
    
    const sql = 'SELECT * FROM userInfo WHERE uemail = ? AND upassword = ?';
    db.query(sql,[email, password], (error, result,fields) => {
      if (error) throw error;
      if(result.length  > 0) {
        const uname = result[0].uname;
        const token = jwt.sign({ uname:uname, email: email },"my-key",{expiresIn:'1d'});
        res.cookie('token',token);
        return res.json({success: true,message:"Successfully"})
      } 
      else {
        return res.json({success: false,message:"Invalid email or password"})
      }
    })

  }
})



app.post('/logout',(req,res)=>{
  res.clearCookie('token');
  return res.json({success:true,message:"Logged out successfully"})
})

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
