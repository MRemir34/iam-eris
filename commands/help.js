exports.run = function (client, msg, args) {
    
  let commands = client.commands.map(x => `\`${x.name}\``).join(", ");
  console.log(commands);
  
    msg.channel.createMessage({embed: {
        color: 0xFFD100,
        title: `Commands for ${client.user.username}`,
        description: commands
    }});
};

exports.aliases = ["pong"];