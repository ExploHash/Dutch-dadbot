const fs = require('fs')
//test
function Dadbot(discordclient){
	//save discord2
	this.discordclient = discordclient;
	//get jokes
	this.loadJokes();
}

Dadbot.prototype.badumtssGifs = ["https://media.giphy.com/media/c8bJDVz7i9KRW/giphy.gif", "https://media1.tenor.com/images/0a15601c186dec6682f750da9ef376ed/tenor.gif?itemid=5348673"]

Dadbot.prototype.loadJokes = function() {//read jokes to memory
	fs.readFile('./jokes.txt', 'utf8', function (err,data) {
		if (err) {
			this.jokes = ["I don't know any jokes... Please feed me some in the jokes.txt"];
			return console.log(err);
		}else{
			this.jokes = data.split("\n");
		}
	});
};

Dadbot.prototype.listen = function() {
	this.discordclient.on('message', message => {//receives message
		if(message.author.username != "Dad-bot"){//message not from dadbot
			const IMwords = ["ik ben ", "i'm ", "i am ", "im "];
			var ikBen = this.containsWords(message.content, IMwords);
			if(ikBen.found && ikBen.position == 0){
				var identationFound = this.containsWords(ikBen.messageAfter, [".", ",", ":", ";"]);
				if(identationFound.found){
					message.channel.send("Hallo " + identationFound.messageBefore + ". I'm dad.");
				}else{//Nothing found
					message.channel.send("Hallo " + ikBen.messageAfter + ". I'm dad.");		
				}
			}
			if(this.containsWords(message.content, ["papgrap", "pap grap", "dadjoke", "dad joke"]).found){//wanner dad joke wordt gevonden
				var id = Math.round(Math.random() * (jokes.length - 1)); //random id
				message.channel.send(jokes[id]);
			}
			if(this.containsWords(message.content, ["ba dum tss", "badum tss", "badumtss"]).found){//wanneer een badumtss wordt gevonden
				var id = Math.round(Math.random() * (this.badumtssGifs.length - 1)); //random id
				message.channel.send(this.badumtssGifs[id]);
			}
		}
	});
};

Dadbot.prototype.containsWords = function(message, array) {
	if(array.constructor.name !== "Array"){
		console.log("No array");
		return false;
	}
	//loop
	for(var i = 0; i < array.length; i++){
		var position = message.toLowerCase().indexOf(array[i]);
		if(position >= 0){
			return {
				found: true,
				position: position,
				len: array[i].length,
				messageAfter: message.substring(position + array[i].length, message.length),
				messageBefore: message.substring(0, position)
			}
		}
	}
	return {
		found: false
	}
};

module.exports = Dadbot