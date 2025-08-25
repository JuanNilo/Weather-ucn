const { handleDataByRange } = require('./dataHandler');

const start = '2025-08-01';
const end = '2025-08-24';

handleDataByRange(start, end).then(() => {
  console.log("Datos poblados correctamente.");
  process.exit(0);
}).catch(() => process.exit(1));