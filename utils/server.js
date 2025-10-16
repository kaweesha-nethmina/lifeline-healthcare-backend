const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const jwtMiddleware = require('./middlewares/jwtMiddleware');
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patients');
const doctorRoutes = require('./routes/doctors');
const adminRoutes = require('./routes/admin');
const emergencyRoutes = require('./routes/emergency');
const paymentRoutes = require('./routes/payments');
const insuranceRoutes = require('./routes/insurance');
const prescriptionRoutes = require('./routes/prescriptions');
const notificationRoutes = require('./routes/notifications');
const nurseRoutes = require('./routes/nurses');
const staffRoutes = require('./routes/staff');
const healthcareManagerRoutes = require('./routes/healthcareManager');
const systemAdminRoutes = require('./routes/systemAdmin');
const userRoutes = require('./routes/users');

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Public Routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Lifeline Smart Healthcare System API' });
});

app.use('/auth', authRoutes);

// Protected Routes (JWT Middleware)
app.use(jwtMiddleware);
app.use('/patients', patientRoutes);
app.use('/doctors', doctorRoutes);
app.use('/admin', adminRoutes);
app.use('/emergency', emergencyRoutes);
app.use('/payments', paymentRoutes);
app.use('/insurance', insuranceRoutes);
app.use('/prescriptions', prescriptionRoutes);
app.use('/notifications', notificationRoutes);
app.use('/nurses', nurseRoutes);
app.use('/staff', staffRoutes);
app.use('/manager', healthcareManagerRoutes);
app.use('/system-admin', systemAdminRoutes);
app.use('/users', userRoutes);

// Start server with error handling
const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is already in use. Trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error(err);
    }
  });
};

// Try to start server on default port, fallback to next available port
startServer(parseInt(port));

module.exports = app;