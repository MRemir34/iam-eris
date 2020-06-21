module.exports = async client => {
    console.log(`${client.user.username} is ready now!`);
    client.editStatus({name: "Wooh! ", type: 1, url: "https://discord.gg/FMYFxWz"});
};

