const Discord = require('discord.js');
const client = new Discord.Client();
const Dadbot = require('./dadbot')

client.on('ready', () => {//start
  console.log('Ik ben wakker!');
  client.user.setGame("een vader");
});

var dadbot = new Dadbot(client);
dadbot.listen();

client.login(process.env.DADBOT_API_KEY);