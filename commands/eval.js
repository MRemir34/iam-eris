exports.run = async (client, msg, args) => {
  const owners = client.config.ownerID.forEach(async(owner) => {
    
    if (msg.author.id !== owner) return;

    try {
      const code = args.slice(1).join(" ");
      if (!code) return;
      let evaled;
      if (code.includes("token") || code.includes("env")) {
        evaled = ":P";
      } else {
        evaled = eval(code);
      }
      
      let type = typeof evaled

      if (typeof evaled !== "string")
      evaled = require('util').inspect(evaled, { depth: 0});
      let output = clean(evaled);
      
      if (output.length > 1024) {
          const postCode = await client.util.haste(output);
            msg.channel.createMessage({embed: {
            color: client.config.colors.success,
            description: postCode,
            fields: [
              {name: 'Type', value: client.util.haste("js", type)}
            ]
    }});
      } else {
            msg.channel.createMessage({embed: {
            color: client.config.colors.success,
            description: client.util.haste("js", output),
            fields: [
              {name: 'Type', value: client.util.haste("js", type)}
            ]
    }});
      }
    } catch (e) {
      let error = clean(e);
      if (error.length > 1024) {
          const postCode = await client.util.haste(output);
            msg.channel.createMessage({embed: {
            color: client.config.colors.success,
            description: postCode,
            fields: [
              {name: 'Type', value: client.util.haste("js", type)}
            ]
    }});
      } else {
          embed.setColor('0xff0000')
          embed.addField('Error', '```js\n' + error + '```');
          embed.addField("Type", `\`\`\`js\n${this.type}\n\`\`\``)
      }
      message.channel.send(embed);
    }

  });
}

exports.aliases = ['ev'];

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}