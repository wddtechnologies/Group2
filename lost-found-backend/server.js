const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 1. Connection Configuration
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',      // XAMPP default is empty
  database: 'group2',
  port: 3306         // Default MySQL port
});

// 2. Connect and Log Errors specifically
db.connect(err => {
  if (err) {
    console.error('DATABASE CONNECTION FAILED:');
    console.error('Error Code:', err.code);
    console.error('Error Message:', err.message);

    if (err.code === 'ECONNREFUSED') {
      console.error(' TIP: Is MySQL actually running in your XAMPP Control Panel?');
    } else if (err.code === 'ER_BAD_DB_ERROR') {
      console.error(' TIP: Did you create the database named "group2" in PHPMyAdmin?');
    }
  } else {
    console.log('Connected to MySQL database: group2');
  }
});

// 3. The API Route
app.get('/api/reports/public', (req, res) => {
  const sql = "SELECT * FROM reports WHERE status = 'Approved'";

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Query Error:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

// 4. Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`Test this link in your browser: http://localhost:${PORT}/api/reports/public`);
});
