const Discord = require('discord.js');
const { token } = require('./config.json')

const client = new Discord.Client();

client.once('ready', () => {
	console.log("42Leaks is ready !");
	client.user.setActivity(`Votez Leaks !`);
})

client.on('message', message => {
	if (message.author.bot) return ;
	if (message.channel.id === "800678489334349884")
	{
		message.react("👍");
		message.react("🤷‍♂️");
		message.react("👎");
		return ;
	}
})

client.login(token);