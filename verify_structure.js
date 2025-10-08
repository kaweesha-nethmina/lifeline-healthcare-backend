// Route verification script
const fs = require('fs');
const path = require('path');

// List of expected route files
const expectedRoutes = [
  'auth.js',
  'patients.js',
  'doctors.js',
  'admin.js',
  'emergency.js',
  'payments.js',
  'insurance.js'
];

// List of expected middleware files
const expectedMiddlewares = [
  'jwtMiddleware.js'
];

// List of expected utility files
const expectedUtils = [
  'passwordUtils.js',
  'jwtUtils.js'
];

// List of expected directories
const expectedDirectories = [
  'routes',
  'middlewares',
  'controllers',
  'models',
  'utils',
  'db',
  'config'
];

console.log('🔍 Verifying project structure...\n');

// Check directories
console.log('📁 Checking directories:');
expectedDirectories.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (fs.existsSync(dirPath)) {
    console.log(`  ✅ ${dir}`);
  } else {
    console.log(`  ❌ ${dir} (missing)`);
  }
});

console.log('\n🔗 Checking routes:');
expectedRoutes.forEach(route => {
  const routePath = path.join(__dirname, 'routes', route);
  if (fs.existsSync(routePath)) {
    console.log(`  ✅ ${route}`);
  } else {
    console.log(`  ❌ ${route} (missing)`);
  }
});

console.log('\n🔧 Checking middlewares:');
expectedMiddlewares.forEach(middleware => {
  const middlewarePath = path.join(__dirname, 'middlewares', middleware);
  if (fs.existsSync(middlewarePath)) {
    console.log(`  ✅ ${middleware}`);
  } else {
    console.log(`  ❌ ${middleware} (missing)`);
  }
});

console.log('\n🛠️ Checking utilities:');
expectedUtils.forEach(util => {
  const utilPath = path.join(__dirname, 'utils', util);
  if (fs.existsSync(utilPath)) {
    console.log(`  ✅ ${util}`);
  } else {
    console.log(`  ❌ ${util} (missing)`);
  }
});

console.log('\n📄 Checking configuration files:');
const configFiles = ['.env', 'package.json', 'server.js'];
configFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} (missing)`);
  }
});

console.log('\n✅ Verification complete!');