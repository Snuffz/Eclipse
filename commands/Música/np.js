const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const API = require("../../Structures/extensions/utils")
const config = require("../../Structures/jsons/config.json")
module.exports.run = async(bot, message, args, idioma) => {
    const player = message.client.manager.players.get(message.guild.id);

    if(!player) return message.channel.send(idioma.np.nada)


    const { title, author, duration } = player.queue.current;
    const embed = new MessageEmbed()
    .setColor(config.color)
    .setAuthor("NowPlaying.", message.author.avatarURL({dynamic: true, size: 2048}))
    .setTimestamp()
    .setDescription(stripIndents`
            ${player.playing ? API.emojis.play.id : API.emojis.pause.id} **${title}** \`(${API.time2(duration)})(${API.time2(player.position)})\` \n${idioma.np.por} **${author}**
            `);
    
            return message.channel.send(embed);
}


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: ["np", "playingnow"]
}
exports.help = {
    nome: "nowplaying",
    descrição: "Mostra a música tocando agora",
    uso: "nowplaying",
    categoria: "Música"
}
