const { Client, Events, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');

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
  
	console.log(`${c.author}: ${c.content}`);

    setTimeout(() => c.delete(), 100);
    c.channel.send(`test: ${c.author} ${c.content}, message deleted`);
    // c.react('👍');

    const violationReason = 'test reason';
    c.author.send(`Your message <${c.content}> has deleted due to non-inclusive contents, the reason is [${violationReason}]`);
})

// Log in to Discord with your client's token
client.login(DISCORD_TOKEN);