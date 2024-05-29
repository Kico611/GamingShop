const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL connection
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gamingshop'
});

db.connect(function (error) {
    if (error) {
        console.error('Database connection error:', error);
        throw error;
    }
    console.log('Connected to the database.');
});

// Register endpoint
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    db.query('INSERT INTO user (Username, Password) VALUES (?, ?)', [username, password], (error, results) => {
        if (error) {
            console.error('Error inserting user:', error);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'User registered successfully' });
    });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM user WHERE Username = ? AND Password = ?', [username, password], (error, results) => {
        if (error) {
            console.error('Error querying user:', error);
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (results.length > 0) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Login failed' });
        }
    });
});
app.get('/dohvati', (req, res) => {
    db.query("SELECT * FROM product", (err, result, fields) => {
      if (err) {
        console.error('Error fetching data from the database:', err);
        return res.status(500).json({ error: 'Database error' });
      }
  
      const data = result.map(item => {
        if (item.Image instanceof Buffer) {
          const base64Image = `data:image/jpeg;base64,${item.Image.toString('base64')}`;
          return { ...item, Base64Image: base64Image };
        }
        return item;
      });
  
      return res.json(data);
    });
  });

// Start the Express server
const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
