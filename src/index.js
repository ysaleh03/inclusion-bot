const dotenv = require('dotenv');

dotenv.config();

// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = process.env.DISCORD_TOKEN;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, c => {
	if (c.author.bot) return;

	console.log(`${c.author}: ${c.content}`);
	client.channels.cache.get(c.channelId).send(`${c.author} ${c.content}`);
})

// Log in to Discord with your client's token
client.login(token);