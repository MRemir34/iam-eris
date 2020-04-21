exports.run = async (client, msg, args) => {
  const owners = client.config.ownerID.forEach(async(owner) => {
    
    if (msg.author.id !== owner) return;

  const {
            args,
            flag
        } = msg;

        try {
            const code = args.join(" ");
            if (!code) return;
            let evaled;

            if (flag.includes("async")) evaled = await eval(`(async () => { ${code} })()`);
            else evaled = eval(code);

            if (flag.includes("silent")) return;

            if (typeof evaled !== "string") {
                evaled = require("util").inspect(evaled, {
                    depth: 0
                });
                evaled = evaled.replace(client.token, "[TOKEN]");
            }
            const output = clean(evaled);
            let result;
            if (output.length > 2000) {
                const ot = await client.util.haste(output);
                result = ot;
            } else result = output;
            const isURL = validateURL(result);
            msg.channel.createMessage({
            embed: {
            description: isURL ? result : client.util.codeBlock(result, "js")
            
            }});
           } catch (e) {
            const error = clean(e);
            let result;
            if (error.length > 2000) {
                const ot = await client.util.haste(error);
                result = ot;
            } else result = error;
            const isURL = validateURL(result);
            msg.channel.createMessage({
            embed: {
            description: isURL ? result : client.util.codeBlock(result, "js")
            
            }});
        }
  });
}

   function clean(text) {
        if (typeof text === "string")
            return text
                .replace(/`/g, "`" + String.fromCharCode(8203))
                .replace(/@/g, "@" + String.fromCharCode(8203));
        else return text;
    }

   function validateURL(str) {
        const pattern = new RegExp("^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$", "i"); // fragment locator
        return !!pattern.test(str);
    }

exports.aliases = ['ev']
