const { Client, Events, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');

const {isHate} = require("../src/controller/cohere");

dotenv.config();

const { DISCORD_TOKEN } = process.env;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, async (c) => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, async c => {
	if (c.author.bot) return;
  
	// console.log(`@${c.author.username}: ${c.content}`);
    const responses = await isHate([c.content]);
    const res = responses[0];

    if (res.isHateful) {
        await Promise.all(
            [
                c.react('👎'),
                c.author.send(`your message \`${c.content}\` was flagged for hate speech with ${(res.confidence * 100).toFixed(0)}% confidence`),
                c.delete(),
                c.channel.send(`message was deleted for hate speech`)]
        );
    } else {
        await c.react('👍');
    }
})

// Log in to Discord with your client's token
client.login(DISCORD_TOKEN);