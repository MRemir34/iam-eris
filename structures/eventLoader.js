const fs = require('fs');

module.exports = client => {
    fs.readdirSync('./events/', (error, events) => {
        if(error) console.log(error);
        events.forEach(_event => {
          try {
    
            let findEvent = require(`../events/${_event}`);
            let event = _event.split(".")[0];
            client.on(event, (...args) => findEvent.run(client, ...args));

          } catch(e) {
            console.log('ERROR', `Failed to load command "${_event}"`, e.message, e.stack);

          }
        });
    });
};