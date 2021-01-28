const Discord = require('discord.js');

const client = new Discord.Client();

var tournament = [];

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
		var joined = 0;
		if (tournament.length)
		{
			tournament.forEach(function(item, index, array) {
				console.log(item);
				let exist = newState.guild.channels.cache.get(item)
					console.log(exist);
					if (exist.joinable)
					{
						newState.member.voice.setChannel(exist);
						joined = 1;
					}
			});
		}
		if (!joined)
		{
			newState.guild.channels.create("Among US", {
				type: 'voice',
				userLimit: 10,
				parent: newState.channel.parent,
				position: 1
			}).then(chan => {
					newState.member.voice.setChannel(chan);
					tournament.push(chan.id);
					chan.setName(`Among US #${tournament.length}`)
				});
		}
	}
	else
	{
		tournament.forEach(function(item, index, array) {
			if (item == oldState.channelID)
			{
				if (oldState.channel.members.array.length == 0)
				{
					oldState.channel.delete();
					tournament.splice(index, 1);
				}
			}
		})
	}
	
});

client.login(process.env.BOT_TOKEN);
