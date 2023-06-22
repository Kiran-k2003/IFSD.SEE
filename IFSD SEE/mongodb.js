const prompt = require('prompt-sync')();
const { MongoClient } = require('mongodb');

class Player {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
}

class Team {
  constructor() {
    this.players = [];
  }

  addPlayer(player) {
    this.players.push(player);
  }

  calculateAverageScore() {
    const totalScore = this.players.reduce((sum, player) => sum + player.score, 0);
    return totalScore / this.players.length;
  }

  calculateMinimumScore() {
    return this.players.reduce((minScore, player) => Math.min(minScore, player.score), Infinity);
  }

  calculateMaximumScore() {
    return this.players.reduce((maxScore, player) => Math.max(maxScore, player.score), -Infinity);
  }
}

async function main() {
  const team = new Team();

  const n = parseInt(prompt("Enter the number of players in the team: "));

  for (let i = 1; i <= n; i++) {
    console.log(`Player ${i}:`);
    const name = prompt("Enter the name of the player: ");
    const score = parseFloat(prompt("Enter the score of the player: "));

    team.addPlayer(new Player(name, score));
  }

  console.log(`Average score: ${team.calculateAverageScore()}`);
  console.log(`Minimum score: ${team.calculateMinimumScore()}`);
  console.log(`Maximum score: ${team.calculateMaximumScore()}`);

  // MongoDB connection and data insertion
  const uri = 'mongodb+srv://kirank:kiran123@cluster0.ta3czbi.mongodb.net/?retryWrites=true&w=majority'; // Update with your MongoDB connection URI
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = 'play'; // Update with your database name
    const collection = 'test'; // Update with your collection name

    // Inserting team data into the collection
    // await collection.insertOne(team);

    console.log('Team data saved in MongoDB.');
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

main();