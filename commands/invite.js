exports.run = function (client, msg, args) {
    
    let link = `https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`;
  
    msg.channel.createMessage({embed: {
        color: client.config.colors.success,
        description: `Add me to you [server](${link}) || Join my support [server](https://discord.gg/FMYFxWz)`
    }});
};

exports.aliases = ["support"];