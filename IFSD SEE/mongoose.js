const prompt = require('prompt-sync')();
const mongoose = require('mongoose');

// Define the Player schema
const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  score: { type: Number, required: true },
});

// Define the Team schema
const teamSchema = new mongoose.Schema({
  players: [playerSchema],
});

// Create the Player model
const Player = mongoose.model('Player', playerSchema);

// Create the Team model
const Team = mongoose.model('Team', teamSchema);

async function main() {
  try {
    // Connect to MongoDB
    const uri = 'mongodb+srv://kirank:kiran123@cluster0.ta3czbi.mongodb.net/?retryWrites=true&w=majority/team_players'; // Update with your MongoDB connection URI
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const team = new Team();
    const n = parseInt(prompt('Enter the number of players in the team: '));

    for (let i = 1; i <= n; i++) {
      console.log(`Player ${i}:`);
      const name = prompt('Enter the name of the player: ');
      const score = parseFloat(prompt('Enter the score of the player: '));

      const player = new Player({ name, score });
      team.players.push(player);
    }

    // Save the team data to MongoDB
    await team.save();
    console.log('Team data saved in MongoDB.');

    // Fetch the team data from MongoDB
    const fetchedTeam = await Team.findOne();
    if (fetchedTeam) {
      console.log(`Average score: ${fetchedTeam.calculateAverageScore()}`);
      console.log(`Minimum score: ${fetchedTeam.calculateMinimumScore()}`);
      console.log(`Maximum score: ${fetchedTeam.calculateMaximumScore()}`);
    } else {
      console.log('No team data found.');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

main();
