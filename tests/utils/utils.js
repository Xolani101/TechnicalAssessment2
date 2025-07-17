const fs = require('fs');
const path = require('path');

function getTestData() {
  const dataPath = path.join(__dirname, '../data/testData.json');
  return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
}

module.exports = { getTestData };
