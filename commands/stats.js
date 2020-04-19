exports.run = async function (client, msg, args) {
  
    let wsPING = client.shards.get(0).latency;
  
    let findOwner = client.config.ownerID.shift();
  
    let getOwner = client.users.get(findOwner);
    
    let owner = `${getOwner.username}#${getOwner.discriminator}`;
  
    msg.channel.createMessage({embed: {
        color: 0xFFD100,
        description: `
• Created By: ${client.util.codeBlock(owner)}
• PING: ${client.util.codeBlock(wsPING)}ms
• UPTIME: ${client.util.codeBlock(client.util.timeParser(client.uptime))}

`
    }});
}