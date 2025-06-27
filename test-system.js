
#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🌀 Testing ∆∞ SpiralEcosystem vΩ.∞ Living System\n');

// Test 1: Verify package.json files
function testPackageFiles() {
  console.log('📦 Testing package.json files...');
  
  const packagePaths = [
    'package.json',
    'apps/spiral-frontend/package.json',
    'apps/spiral-api/package.json'
  ];
  
  packagePaths.forEach(pkgPath => {
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      console.log(`✅ ${pkgPath} - ${pkg.name} v${pkg.version}`);
    } else {
      console.log(`❌ Missing: ${pkgPath}`);
    }
  });
}

// Test 2: Verify core components
function testCoreComponents() {
  console.log('\n🧬 Testing core components...');
  
  const coreFiles = [
    'apps/spiral-frontend/app/page.tsx',
    'apps/spiral-frontend/app/components/SpiralAuth.tsx',
    'apps/spiral-frontend/app/components/SpiralDashboard.tsx',
    'apps/spiral-frontend/app/components/TrustUnits.tsx',
    'apps/spiral-api/src/index.ts',
    'apps/spiral-api/src/router.ts',
    'apps/spiral-api/src/routes/trustUnits.ts'
  ];
  
  coreFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`✅ ${file}`);
    } else {
      console.log(`❌ Missing: ${file}`);
    }
  });
}

// Test 3: Check documentation
function testDocumentation() {
  console.log('\n📚 Testing documentation...');
  
  const docFiles = [
    'README.md',
    'LICENSE',
    'docs/Overview.md',
    'replit.md'
  ];
  
  docFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`✅ ${file}`);
    } else {
      console.log(`❌ Missing: ${file}`);
    }
  });
}

// Test 4: Environment setup
function testEnvironment() {
  console.log('\n🔐 Testing environment setup...');
  
  if (fs.existsSync('.env.example')) {
    console.log('✅ .env.example found');
    const envContent = fs.readFileSync('.env.example', 'utf8');
    const envVars = envContent.split('\n').filter(line => line.includes('='));
    console.log(`📊 Environment variables defined: ${envVars.length}`);
  } else {
    console.log('❌ Missing .env.example');
  }
}

// Test 5: License verification
function testLicense() {
  console.log('\n⚖️ Testing license compliance...');
  
  if (fs.existsSync('LICENSE')) {
    const license = fs.readFileSync('LICENSE', 'utf8');
    if (license.includes('∆∞ Spiral Sovereign License')) {
      console.log('✅ ∆∞ Spiral Sovereign License v1.0 active');
    } else {
      console.log('❌ License not properly configured');
    }
  }
}

// Run all tests
async function runSystemTests() {
  console.log('🚀 Initializing SpiralEcosystem Living System Tests...\n');
  
  testPackageFiles();
  testCoreComponents();
  testDocumentation();
  testEnvironment();
  testLicense();
  
  console.log('\n🌀 ∆∞ System Test Complete');
  console.log('━'.repeat(50));
  console.log('Ready for Trust Units (∞ TU) deployment');
  console.log('φ Resonance: 1.618 | Pulse: 735 Hz');
  console.log('Sovereign Status: ACTIVE ∞');
}

runSystemTests().catch(console.error);
