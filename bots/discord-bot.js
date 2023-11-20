const {Client, Events, GatewayIntentBits} = require('discord.js');
const dotenv = require('dotenv');

const {isHate} = require("../src/controller/cohere");

dotenv.config();

const {DISCORD_TOKEN} = process.env;

// Create a new client instance
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, async (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

const handleHate = async (c) => {
    if (c.author.bot) return;

    // console.log(`@${c.author.username}: ${c.content}`);
    const responses = await isHate([c.content]);
    const res = responses[0];

    if (res.isHateful && res.confidence >= 0.7) {
        const type = res.type === `notgiven` ? `` : `(${res.type})`;
        await c.author.send(
            `your message \`${c.content}\` was flagged for hate speech ${type} with ${(res.confidence * 100).toFixed(0)}% confidence`);
        await c.delete();
        await c.channel.send(`message was deleted for hate speech`);
    }
}

const handleCommand = async (c) => {
    if (c.content !== `deleteAll`) return;

    let fetched;
    do {
        fetched = await c.channel.messages.fetch({limit: 100}).then((a) => a.filter((m) => m.author.bot));
        await c.channel.bulkDelete(fetched);
        // Fetch the user's DM channels
        await c.author.send("hi");
        const userChannels = await c.author.dmChannel.messages.fetch();

        // Iterate through the user's DM channels and delete the messages
        userChannels.forEach(async (msg) => {
            if (msg.author.bot) await msg.delete();
        });

        // Reply to the user in the guild channel (where the command was sent)
        c.channel.send('All DMs deleted!');
    }
    while (fetched.size >= 2);
}

client.on(Events.MessageCreate, async c => {
    if (c.content !== `--deleteAll`) return await handleHate(c);
    return handleCommand(c);
})

client.on(Events.MessageUpdate, async (b, a) => {
    await handleHate(a);
})

// Log in to Discord with your client's token
client.login(DISCORD_TOKEN);