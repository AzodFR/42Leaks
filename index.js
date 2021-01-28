const Discord = require('discord.js');

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

client.on('voiceStateUpdate', function(oldState, newState){
	if (newState.channelID == "804428631429742683")
	{
		newState.guild.channels.create("Among US", {
			type: 'voice',
			userLimit: 10,
			position: 16
		}).then(chan => newState.member.voice.setChannel(chan));
	}
	
});

client.login(process.env.BOT_TOKEN);
