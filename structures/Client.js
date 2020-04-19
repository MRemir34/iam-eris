const { Client, Collection } = require('eris');
const { readdir, readdirSync } = require('fs');
const eventLoader = require('./eventLoader.js');
class ErisBot extends Client {

    constructor(config, options) {

        super(config.TOKEN, options);

        this.config = config;
        this.commands = new Collection();
        this.aliases = new Collection();
        this._loadCommands();
        eventLoader(this);
    }

    _loadCommands() {
        readdir(`${process.cwd()}/commands/`, (err, files) => {
            if (err) {
                return console.log('ERROR', 'Unable to index "commands"', err);
            }

            files.forEach(file => {
                try {
                    const command = require(`${process.cwd()}/commands/${file}`);
                    const name = file.replace('.js', '').toLowerCase();
                    this.commands.set(name, command);

                    if (command.aliases) {
                        for (const alias of command.aliases) {
                            this.aliases.set(alias, name);
                        }
                    }
                } catch(e) {
                    console.log('ERROR', `Failed to load command "${file}"`, e.message, e.stack);
                }
            });
        });
    }

}

module.exports = ErisBot;