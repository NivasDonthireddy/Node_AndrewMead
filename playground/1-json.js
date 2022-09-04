const fs = require('fs');
const jsonData = fs.readFileSync('./1-json.json').toString();

const data = JSON.parse(jsonData);
data.name = 'Savin';
data.age = 26;

const modifiedData = JSON.stringify(data);
fs.writeFileSync('1-json.json',modifiedData);
