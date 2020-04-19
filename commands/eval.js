const choice = ['🚫'] 

exports.run = async (client, msg, args) => {
  const owner = client.config.ownerID;
  owner.forEach(async(owner) => {
    
    if (msg.author.id !== owner) return;

    try {
      const code = args.join(" ");
      if (!code) return msg.channel.createMessage({})
      let evaled;
      if (code.includes(`token`)) {
        evaled = 'Thats bad... Too bad Onii-chan';
      } else {
        evaled = eval(code);
      }

      if (typeof evaled !== "string")
      evaled = require('util').inspect(evaled, { depth: 0});

      let output = clean(evaled);
      if (output.length > 1024) {
          const { body } = await snek.post('https://www.hastebin.com/documents').send(output);
          embed.addField('Output', `https://www.hastebin.com/${body.key}.js`);
      } else {
          embed.addField('Output', '```js\n' + output + '```');
      }
      message.channel.send(embed);
    } catch (e) {
      let error = clean(e);
      if (error.length > 1024) {
          const { body } = await snek.post('https://www.hastebin.com/documents').send(error);
          embed.addField('Error', `https://www.hastebin.com/${body.key}.js`);
      } else {
          embed.addField('Error', '```js\n' + error + '```');
      }
      message.channel.send(embed);
    }
  });
}

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

exports.clean = (text) => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}