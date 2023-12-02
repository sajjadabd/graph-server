const express = require('express');
const { v4: uuidv4 } = require('uuid'); // Import the UUID module
const cors = require('cors'); // Import the CORS module
const app = express();
const port = 3000;

// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const NUMBER_OF_NODES = 100_000;

const NUMBER_OD_EDGES = 50_000;

// Generate 100 random nodes with UUIDs as IDs
const nodes = Array.from({ length: NUMBER_OF_NODES }, () => ({ id: uuidv4() }));

// Generate random edges connecting nodes with UUIDs as sourceId and targetId
const edges = [];

let sourceId;
let targetId;

for (let i = 0; i < NUMBER_OD_EDGES; i++) {

  do {
	sourceId = nodes[getRandomInt(0, NUMBER_OF_NODES-1)].id;
	targetId = nodes[getRandomInt(0, NUMBER_OF_NODES-1)].id;
  } while(sourceId == targetId);
  

  // Ensure that edges don't connect a node to itself
  edges.push({ id: uuidv4(), sourceId, targetId });
}

const graphData = {
  nodes,
  edges,
};

// Enable CORS for the '/graph' route
app.use(cors());

app.get('/graph', (req, res) => {
  res.json(graphData);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
