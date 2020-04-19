const choice = ['🚫'] 

exports.run = async (client, msg, args) => {
  const owner = client.config.ownerID;
  owner.forEach(async(owner) => {
    
    if (msg.author.id !== owner) return;

    try {
      const code = args.join(" ");
      if (!code) return msg.channel.createMessage({embed: {color: client.config.color, description: "No arguments provided!"}  })
      let evaled;

      if (typeof evaled !== "string")
      evaled = require('util').inspect(evaled, { depth: 0});

      let output = clean(evaled);
      if (output.length > 1024) {
        let res =  await client.util.haste(output)
          msg.channel.createMessage({embed: {description: `Output:\n${res}`}});
      } else {
          msg.channel.createMessage({embed: {description: `Output:\n${client.util.codeBlock(output, "js")}`}});
      }
    } catch (e) {
      let error = clean(e);
      if (error.length > 1024) {
          const res = await client.util.haste(error);
          msg.channel.createMessage({embed: {description: `Error:\n${res}`}});
      } else {
          msg.channel.createMessage({embed: {description: `Error:\n${client.util.codeBlock(error, "bash")}`}});
      }
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