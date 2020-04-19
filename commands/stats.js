exports.run = async function (client, msg, args) {
    
    let findOwner = client.config.ownerID.shift(); //to get your owner name put your ID at index 0 in config
  
    let getOwner = client.users.get(findOwner);
   // console.log(getOwner)
    let owner = `${getOwner.username}#${getOwner.discriminator}`;
  
    let wsPING = client.shards.get(0).latency;

  
    msg.channel.createMessage({embed: {
        color: 0xFFD100,
        description: `
• Created By: ${client.util.codeBlock(''+getOwner.discriminator)}
• PING: ${client.util.codeBlock(wsPING+'ms')}
• UPTIME: ${client.util.codeBlock(client.util.timeParser(client.uptime))}
• Total Guilds: ${client.util.codeBlock(client.guilds.size)}
• Total Users: ${client.util.codeBlock(client.users.size)}
• Total Channels: 
•
`
    }});
}