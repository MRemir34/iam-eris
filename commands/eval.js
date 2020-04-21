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
            const output = this.clean(evaled);
            let result;
            if (output.length > 2000) {
                const ot = await client.util.haste(output);
                result = ot;
            } else result = output;

            const isURL = this.validateURL(result);
            msg.channel.createMessage({
            embed: {
            description: client.util.codeBlock(result, "js")
            
            }})
            embed.setDescription(isURL ? result : `\`\`\`js\n${result}\n\`\`\``);
        } catch (e) {
            const error = this.clean(e);
            let result;
            if (error.length > 2000) {
                const {
                    body: {
                        key
                    }
                } = await client.request.post("https://bin.zealcord.xyz/documents").send(error);
                result = `https://bin.zealcord.xyz/${key}`;
            } else result = error;

            embed
                .setAuthor("Error")
                .setColor("0xff0000");

            const isURL = this.validateURL(result);

            if (flag.includes("no-embed")) {
                message.channel.send(isURL ? result : `\`\`\`js\n${result}\n\`\`\``);
                return;
            }
            embed.setDescription(isURL ? result : `\`\`\`js\n${result}\n\`\`\``);
        }

        embed.setFooter(`⏱️ ${Date.now() - runnedtimestamp}ms`);
        message.channel.send(embed);
  });
}

exports.aliases = ['ev']


    

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
