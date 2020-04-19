const choice = ['🚫'] 

exports.run = async (client, msg, args) => {
  const owners = client.config.ownerID.forEach(async(owner) => {
    
    if (msg.author.id !== owner) return;

     try {
        let code = eval(args.join(' '));

        if (typeof code !== 'string') {
            code = require('util').inspect(code, { depth: 0 });
        }
        let output = clean(code);
        output = output.replace(new RegExp(client.token.slice(3), 'gi'), 'GG! You hungry?');
       if(code.length > 1023) {
       let res = await client.util.haste(output);
       msg.channel.createMessage(res);

       } else {
        msg.channel.createMessage(client.util.codeBlock(output, "js"));
       }
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