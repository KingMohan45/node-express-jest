// Import dependencies
import express from 'express';
import {UserModel} from './models/user.js';

// Create an instance of Express.js
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
  res.send('Server is up and running!');
});

// API route to retrieve users
app.get('/api/users', async (req, res) => {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API route to add a user
app.post('/api/users', async (req, res) => {
  try {
    const { name } = req.body;
    if(!name){
        res.status(500).json({ error: 'Invalid name' });    
    }
    const user = await UserModel.create({ name });
    res.json(user);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { app };
