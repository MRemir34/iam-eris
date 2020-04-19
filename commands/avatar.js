exports.run = function (client, msg, args) {
    
   let user = msg.mentions.users.first() || client.users.get(args[0])
   if(user) user = msg.author;
  
    msg.channel.createMessage({embed: {
        color: client.config.colors.success,
        title: `Avatar Link`,
        url: user.avatarURL,
        image: {
          url: user.avatarURL
        }
    }});
};

exports.aliases = ["avtr", 'pfp'];