const { Client, Events, GatewayIntentBits } = require('discord.js');

const dotenv = require('dotenv');

dotenv.config();

const { DISCORD_TOKEN, COHERE_API_KEY } = process.env;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(DISCORD_TOKEN);