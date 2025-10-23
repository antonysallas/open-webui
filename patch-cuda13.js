#!/usr/bin/env node
/**
 * Patch script to add CUDA 13 support to onnxruntime-node
 * Run this after npm install fails
 */

const fs = require('fs');
const path = require('path');

const installUtilsPath = path.join(
  __dirname,
  'node_modules',
  'onnxruntime-node',
  'script',
  'install-utils.js'
);

console.log('Patching onnxruntime-node for CUDA 13 support...');

if (!fs.existsSync(installUtilsPath)) {
  console.error('Error: onnxruntime-node not found. Run npm install first (even if it fails).');
  process.exit(1);
}

let content = fs.readFileSync(installUtilsPath, 'utf8');

// Replace the CUDA version check to include version 13
const oldCheck = /if \(ver !== 11 && ver !== 12\)/g;
const newCheck = 'if (ver !== 11 && ver !== 12 && ver !== 13)';

if (content.match(oldCheck)) {
  content = content.replace(oldCheck, newCheck);
  fs.writeFileSync(installUtilsPath, content, 'utf8');
  console.log('✓ Successfully patched install-utils.js to support CUDA 13');
  console.log('✓ You can now run: npm install');
} else {
  console.log('Warning: Could not find expected CUDA version check.');
  console.log('The package may have been updated. Please check manually.');
}
