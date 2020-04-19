exports.run = async function (client, msg, args) {
    let wsPING = client.shards.get(0).latency;
    
    msg.channel.createMessage({embed: {
        color: 0xFFD100,
        description: `
• Created By: 
• PING: \`\`\`${wsPING}ms\`\`\`
• UPTIME: \`\`\`${client.util.timeParser(client.uptime)}\`\`\`

`
    }});
}