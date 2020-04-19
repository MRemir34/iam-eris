exports.run = function (client, msg, args) {
    let wsPING = client.shards.get(0).latency;

    msg.channel.createMessage({embed: {
        color: 0xFFD100,
        description: `My ping is ${wsPING}ms`
    }});
}