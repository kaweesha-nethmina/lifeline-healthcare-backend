// Test to verify route exports
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patients');
const doctorRoutes = require('./routes/doctors');
const adminRoutes = require('./routes/admin');
const emergencyRoutes = require('./routes/emergency');
const paymentRoutes = require('./routes/payments');
const insuranceRoutes = require('./routes/insurance');

console.log('🧪 Testing route exports...');

const routes = [
  { name: 'auth', module: authRoutes },
  { name: 'patients', module: patientRoutes },
  { name: 'doctors', module: doctorRoutes },
  { name: 'admin', module: adminRoutes },
  { name: 'emergency', module: emergencyRoutes },
  { name: 'payments', module: paymentRoutes },
  { name: 'insurance', module: insuranceRoutes }
];

let allPassed = true;

routes.forEach(route => {
  if (route.module && typeof route.module === 'function') {
    console.log(`  ✅ ${route.name} routes exported correctly`);
  } else {
    console.log(`  ❌ ${route.name} routes not exported correctly`);
    allPassed = false;
  }
});

if (allPassed) {
  console.log('\n🎉 All route modules exported correctly!');
} else {
  console.log('\n❌ Some route modules have issues');
}

// Test middleware export
const jwtMiddleware = require('./middlewares/jwtMiddleware');
if (jwtMiddleware && typeof jwtMiddleware === 'function') {
  console.log('✅ JWT middleware exported correctly');
} else {
  console.log('❌ JWT middleware not exported correctly');
}

// Test utility exports
const { hashPassword, comparePassword } = require('./utils/passwordUtils');
const { generateToken, verifyToken } = require('./utils/jwtUtils');

const utils = [
  { name: 'hashPassword', fn: hashPassword },
  { name: 'comparePassword', fn: comparePassword },
  { name: 'generateToken', fn: generateToken },
  { name: 'verifyToken', fn: verifyToken }
];

utils.forEach(util => {
  if (util.fn && typeof util.fn === 'function') {
    console.log(`✅ ${util.name} utility exported correctly`);
  } else {
    console.log(`❌ ${util.name} utility not exported correctly`);
  }
});