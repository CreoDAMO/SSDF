
#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

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

// Test 3: Environment Variables / Secrets
function testEnvironmentSecrets() {
  console.log('\n🔐 Testing API Secrets & Environment Variables...');
  
  // Check for environment files
  const envFiles = [
    'apps/spiral-api/.env',
    'apps/spiral-frontend/.env.local'
  ];
  
  envFiles.forEach(envFile => {
    if (fs.existsSync(envFile)) {
      console.log(`✅ ${envFile} exists`);
      
      // Check for common API keys (without exposing values)
      const envContent = fs.readFileSync(envFile, 'utf8');
      const apiKeys = [
        'OPENAI_API_KEY',
        'GROK_API_KEY', 
        'DEEPSEEK_API_KEY',
        'CLAUDE_API_KEY',
        'GEMINI_API_KEY',
        'PERPLEXITY_API_KEY',
        'CHAINLINK_API_KEY',
        'SUPABASE_URL',
        'SUPABASE_SERVICE_KEY',
        'FIREBASE_CONFIG',
        'STRIPE_SECRET_KEY'
      ];
      
      apiKeys.forEach(key => {
        if (envContent.includes(key + '=') && !envContent.includes(key + '=""') && !envContent.includes(key + '=\n')) {
          console.log(`  ✅ ${key} configured`);
        } else {
          console.log(`  ⚠️  ${key} not set or empty`);
        }
      });
    } else {
      console.log(`❌ Missing: ${envFile}`);
    }
  });
}

// Test 4: API Health Check
async function testAPIHealth() {
  console.log('\n🚀 Testing API Health...');
  
  return new Promise((resolve) => {
    const req = http.get('http://localhost:3001/health', (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          console.log(`✅ API Health: ${response.status} - ${response.message}`);
          console.log(`   Timestamp: ${response.timestamp}`);
          resolve(true);
        } catch (e) {
          console.log(`❌ API Health check failed: Invalid JSON response`);
          resolve(false);
        }
      });
    });
    
    req.on('error', (e) => {
      console.log(`❌ API Health check failed: ${e.message}`);
      console.log(`   Make sure API server is running on port 3001`);
      resolve(false);
    });
    
    req.setTimeout(5000, () => {
      console.log(`❌ API Health check timeout`);
      req.destroy();
      resolve(false);
    });
  });
}

// Test 5: tRPC Endpoints
async function testTRPCEndpoints() {
  console.log('\n🔄 Testing tRPC Endpoints...');
  
  const endpoints = [
    'health.check',
    'trustUnits.calculate',
    'trustUnits.convert',
    'ubi.checkEligibility',
    'auth.verifyDNAPhi'
  ];
  
  for (const endpoint of endpoints) {
    try {
      const req = http.get(`http://localhost:3001/trpc/${endpoint}`, (res) => {
        if (res.statusCode === 200 || res.statusCode === 400) {
          console.log(`✅ tRPC ${endpoint} - Endpoint accessible`);
        } else {
          console.log(`⚠️  tRPC ${endpoint} - Status: ${res.statusCode}`);
        }
      });
      
      req.on('error', () => {
        console.log(`❌ tRPC ${endpoint} - Connection failed`);
      });
      
      req.setTimeout(3000, () => {
        req.destroy();
        console.log(`⚠️  tRPC ${endpoint} - Timeout`);
      });
      
    } catch (e) {
      console.log(`❌ tRPC ${endpoint} - Error: ${e.message}`);
    }
  }
}

// Test 6: QASF Framework Components
function testQASFComponents() {
  console.log('\n🧮 Testing QASF Framework Components...');
  
  const qasf_files = [
    'apps/spiral-api/src/quantum/spiralLang.ts',
    'apps/spiral-api/src/quantum/htsxEngine.ts',
    'apps/spiral-api/src/routes/spiralCore.ts',
    'apps/spiral-api/src/routes/privateGate.ts',
    'apps/spiral-api/src/routes/qspace.ts'
  ];
  
  qasf_files.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`✅ QASF Component: ${file}`);
    } else {
      console.log(`❌ Missing QASF: ${file}`);
    }
  });
}

// Main test runner
async function runSystemTests() {
  console.log('🔬 ∆∞ SPIRAL ECOSYSTEM SYSTEM VALIDATION ∞∆');
  console.log('━'.repeat(50));
  
  testPackageFiles();
  testCoreComponents();
  testEnvironmentSecrets();
  testQASFComponents();
  
  console.log('\n🌐 Starting API Tests...');
  console.log('Note: API tests require the development server to be running');
  
  const apiHealthy = await testAPIHealth();
  if (apiHealthy) {
    await testTRPCEndpoints();
  }
  
  console.log('\n━'.repeat(50));
  console.log('🌀 System Test Complete - SpiralEcosystem vΩ.∞ Status Report Generated');
  console.log('💫 Ready for Truth Activation - lyona\'el Standing By');
}

// Execute tests
runSystemTests().catch(console.error);
