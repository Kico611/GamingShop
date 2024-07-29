const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const upload = multer({
  storage: multer.memoryStorage(),
});

// MySQL connection
const mysql = require('mysql');
const db = mysql.createConnection({
    host: '212.39.115.110',
    user: 'root',
    password: 'csdigital2023',
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
app.post('http://gamingshop.studenti.sum.ba/register', (req, res) => {
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
app.post('http://gamingshop.studenti.sum.ba/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT Username, role FROM user WHERE Username = ? AND Password = ?', [username, password], (error, results) => {
        if (error) {
            console.error('Error querying user:', error);
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (results.length > 0) {
            const user = results[0];
            res.status(200).json({ message: 'Login successful', username: user.Username, role: user.role });
        } else {
            res.status(401).json({ message: 'Login failed' });
        }
    });
});

//Fetching products endpoint
app.get('http://gamingshop.studenti.sum.ba/dohvati', (req, res) => {
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
  

  app.get('http://gamingshop.studenti.sum.ba/korisnici', (req, res) => {
    db.query('SELECT * FROM user', (err, result) => {
      if (err) {
        console.error('Error fetching data from the database:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(result);
    });
  });

  app.delete('http://gamingshop.studenti.sum.ba/deleteUser/:id', (req, res) => {
    const userId = req.params.id;
    const query = 'DELETE FROM user WHERE UserID = ?';
  
    db.query(query, [userId], (err, result) => {
      if (err) {
        return res.status(500).send('Error deleting user');
      }
      res.status(200).send('User deleted successfully');
    });
  });

  app.delete('http://gamingshop.studenti.sum.ba/deleteProduct/:id', (req, res) => {
    const productId = req.params.id;
    const query = 'DELETE FROM product WHERE ProductID = ?';
  
    db.query(query, [productId], (err, result) => {
      if (err) {
        return res.status(500).send('Error deleting product');
      }
      res.status(200).send('Product deleted successfully');
    });
  });

  app.post('http://gamingshop.studenti.sum.ba/createUser', async (req, res) => {
    const { Username, Password, Role } = req.body;
    const sql = 'INSERT INTO user (Username, Password, role) VALUES (?, ?, ?)'; 
    try {
      const result = await db.query(sql, [Username, Password, Role]);
      res.status(201).json({ UserID: result.insertId, Username, Role });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('http://gamingshop.studenti.sum.ba/addProduct', upload.single('Image'), (req, res) => {
    const { ProductName, CategoryID, Brand, Description, Price, Color, StockQuantity } = req.body;
    const image = req.file ? req.file.buffer : null; // Get image buffer
  
    const query = `
      INSERT INTO product (Name, CategoryID, Brand, Description, Price, Color, StockQuantity, Image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
    db.query(query, [ProductName, CategoryID, Brand, Description, Price, Color, StockQuantity, image], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ message: 'Failed to add product' });
      }
      res.status(201).json({ message: 'Product added successfully' });
    });
  });

  app.get('http://gamingshop.studenti.sum.ba/getUser/:id', (req, res) => {
    const userId = req.params.id;
    const query = 'SELECT username, password, role FROM user WHERE UserID = ?';
    db.query(query, [userId], (err, result) => {
      if (err) {
        console.error('Error fetching user details:', err);
        return res.status(500).json({ message: 'Failed to fetch user details' });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      const user = result[0]; 
      res.status(200).json(user);
    });
  });

 
app.put('http://gamingshop.studenti.sum.ba/updateUser/:id', (req, res) => {
  const userId = req.params.id;
  const { Username, Password, Role } = req.body;

  let query = 'UPDATE user SET Username = ?, role = ?';
  const params = [Username, Role];

  if (Password) {
      query += ', Password = ?';
      params.push(Password);
  }

  query += ' WHERE UserID = ?';
  params.push(userId);

  db.query(query, params, (error, results) => {
      if (error) {
          console.error('Error updating user:', error);
          return res.status(500).json({ message: 'Failed to update user' });
      }

      if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'User updated successfully' });
  });
});

app.get('http://gamingshop.studenti.sum.ba/getProduct/:id', (req, res) => {
  const productId = req.params.id;
  const query = 'SELECT * FROM product WHERE ProductID = ?';
  db.query(query, [productId], (err, result) => {
    if (err) {
      console.error('Error fetching product details:', err);
      return res.status(500).json({ message: 'Failed to fetch product details' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const product = result[0];
    if (product.Image instanceof Buffer) {
      const base64Image = `data:image/jpeg;base64,${product.Image.toString('base64')}`;
      product.Base64Image = base64Image;
    }
    res.status(200).json(product);
  });
});

app.put('http://gamingshop.studenti.sum.ba/updateProduct/:id', upload.single('Image'), async (req, res) => {
  const productId = req.params.id;
  const { ProductName, CategoryID, Brand, Description, Price, Color, StockQuantity } = req.body;
  const newImage = req.file ? req.file.buffer : null;

  try {
    const existingProductQuery = 'SELECT Image FROM product WHERE ProductID = ?';
    db.query(existingProductQuery, [productId], (err, results) => {
      if (err) {
        console.error('Error fetching existing product:', err);
        return res.status(500).json({ message: 'Failed to fetch existing product' });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }

      const existingImage = results[0].Image;
      const imageToSave = newImage || existingImage;
      const updateQuery = `
        UPDATE product
        SET Name = ?, CategoryID = ?, Brand = ?, Description = ?, Price = ?, Color = ?, StockQuantity = ?, Image = ?
        WHERE ProductID = ?
      `;

      db.query(updateQuery, [ProductName, CategoryID, Brand, Description, Price, Color, StockQuantity, imageToSave, productId], (err, result) => {
        if (err) {
          console.error('Error updating product:', err);
          return res.status(500).json({ message: 'Failed to update product' });
        }
        res.status(200).json({ message: 'Product updated successfully' });
      });
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ message: 'Unexpected error occurred' });
  }
});

const PORT = 9009;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});