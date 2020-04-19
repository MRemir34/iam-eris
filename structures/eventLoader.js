/*const fs = require('fs');

module.exports = client => {
    readdirSync('./events/', (error, events) => {
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
*/
const { readdirSync } = require("fs");

module.exports = client => {
  const events = readdirSync("./events/");
  for (const event of events) {
    const file = require(`../events/${event}`);
    client.on(event.split(".")[0], (...args) => file(client, ...args));
  }
};