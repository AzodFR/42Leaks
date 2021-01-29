const Discord = require('discord.js');

const client = new Discord.Client();

var tournament = [];
var limit = 10;
var noquit = 0;

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
	else if (message.member.permissions.has("MANAGE_CHANNELS"))
	{
		if (message.content.startsWith("/setlimit"))
		{
			limit = parseInt(message.content.slice(10));
			message.reply(`The new limit is ${limit} users`);
		}
		else if (message.content.startsWith("/randomize"))
		{
			noquit = 1;
			var keeper = [];
			message.reply("let's randomize this !")
			tournament.forEach(function(item, index, array) {
				keeper[index] = 0;
				console.log(`${index} -> ${keeper[index]}`);
			})
			tournament.forEach(function(item, index, array) {
				message.guild.channels.cache.get(item).members.each(function(mem) {
					var newc = getRandomInt(tournament.length);
					console.log(`GET NEW: ${newc}`);
					while (newc == index || keeper[newc] == limit)
					{
						var newc = getRandomInt(tournament.length);
					}
					keeper[newc]++;
					console.log(`${newc} -> ${keeper[newc]}`);
					mem.voice.setChannel(message.guild.channels.cache.get(tournament[newc]))
				})
			})
			noquit = 0
		}
	}
})

client.on('voiceStateUpdate', function(oldState, newState){
	if (newState.channelID == "804428631429742683")
	{
		var joined = 0;
		if (tournament.length)
		{
			tournament.forEach(function(item, index, array) {
				let exist = newState.guild.channels.cache.get(item)
					if (exist.members.size < exist.userLimit)
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
				userLimit: limit,
				parent: newState.channel.parent,
				position: 1
			}).then(chan => {
					newState.member.voice.setChannel(chan);
					tournament.push(chan.id);
					chan.setName(`Among US #${tournament.length}`)
				});
		}
	}
	else if (!noquit)
	{
		console.log(`noquit: ${noquit}`)
		tournament.forEach(function(item, index, array) {
			if (item == oldState.channelID)
			{
				if (oldState.channel.members.size == 0)
				{
					oldState.channel.delete();
					tournament.splice(index, 1);
				}
			}
		})
	}
	
});

client.login(process.env.BOT_TOKEN);

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
