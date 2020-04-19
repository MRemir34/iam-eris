const choice = ['🚫'] 

exports.run = async (client, msg, args) => {
  const owner = client.config.ownerID;
  owner.forEach(async(owner) => {
    
    if (msg.author.id !== owner) return;

     try {
        let code = eval(args.join(' '));

        if (typeof code !== 'string') {
            code = require('util').inspect(code, { depth: 0 });
        }

        code = code.replace(new RegExp(client.token.slice(4), 'gi'), '*');
        msg.channel.createMessage(client.util.codeBlock());
    } catch(e) {
        msg.channel.createMessage(`\`\`\`js\n${e}\n\`\`\``);
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