const { Client, Events, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');

const { classify } = require('../src/controller/cohere/index.js')

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
    const res = await classify([c.content]);

    if (res[0].predictions[0] === "toxic") {
        c.react('👎');
        c.author.send(`your message \`${c.content}\` was deleted for hate speech`);
        // setTimeout(() => c.delete(), 100);
        c.delete();
        c.channel.send(`message was deleted for hate speech`);
    } else {
        c.react('👍');
    }
})

// Log in to Discord with your client's token
client.login(DISCORD_TOKEN);