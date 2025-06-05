require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./config/bot.config');
const videos = require('./data/videos');
const images = require('./data/image');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.on('ready', () => {
    console.log(`🤖 Bot đã đăng nhập với tên ${client.user.tag}`);
});

client.on('messageCreate', message => {
    if (message.author.bot) return;

    const content = message.content.trim().toLowerCase();

    // Xử lý video
    if (content.startsWith(config.videoPrefix)) {
        const keyword = content.slice(config.videoPrefix.length).trim();
        if (videos[keyword]) {
            message.channel.send(`📹 Video cho "${keyword}": ${videos[keyword]}`);
        } else {
            message.channel.send('❌ Không tìm thấy video.');
        }
    }

    // Xử lý hình ảnh
    if (content.startsWith(config.imagePrefix)) {
        const keyword = content.slice(config.imagePrefix.length).trim();
        if (images[keyword]) {
            message.channel.send({ content: `🖼️ Hình ảnh cho "${keyword}":`, files: [images[keyword]] });
        } else {
            message.channel.send('❌ Không tìm thấy hình ảnh.');
        }
    }
});

client.login(process.env.DISCORD_TOKEN);