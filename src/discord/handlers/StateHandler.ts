const stateHandlerDiscord = require('../DiscordManager')
const fs = require('fs')
class StateHandler {
    private discord: typeof stateHandlerDiscord;
    constructor(discord) {
        this.discord = discord
    }

    onReady() {
        this.discord.app.log.discord('Client ready, logged in as ' + this.discord.client.user.tag)
        this.discord.client.user.setActivity('E', { type: 'Watching' })
        this.discord.client.user.setStatus('dnd')
    }

    async checkingWaitLists() {
        let creepsMessage = 'Отсчет времени до вайпа на личном острове\n' +
            'Крипочки:\n'
        let bossMessage = 'Боссы:\n'
        fs.readFile('./bossReminder.json', 'utf-8', async (err, data) => {
            let jsonData = JSON.parse(data)
            for (const [userID, time] of Object.entries(jsonData)) {
                const playerDate = new Date(+time)
                const dateIn7Days = this.addDays(playerDate, 7)
                const timeDiff = dateIn7Days.getTime() - Date.now()
                bossMessage += `<@${userID}> ${this.dhm(timeDiff)} до спавна боссов\n`

                if (timeDiff < 0) {
                    const user = await this.discord.client.users.fetch(userID).catch(() => null);
                    await user.send('Боссы зареспавнились, время пришло.')
                    await user.send('https://tenor.com/view/bonk-gif-26414884')

                    delete jsonData[userID]

                    fs.writeFileSync('./bossReminder.json', JSON.stringify(jsonData))
                }
            }
        })
        fs.readFile('./creepsReminder.json', 'utf-8', async (err, data) => {
            let jsonData = JSON.parse(data)
            for (const [userID, time] of Object.entries(jsonData)) {
                const playerDate = new Date(+time)
                const dateIn7Days = this.addDays(playerDate, 3)
                const timeDiff = dateIn7Days.getTime() - Date.now()
                creepsMessage += `<@${userID}> ${this.dhm(timeDiff)} до спавна крипочков\n`

                if (timeDiff < 0) {
                    const user = await this.discord.client.users.fetch(userID).catch(() => null);
                    await user.send('Крипочки зареспавнились, время пришло.')
                    await user.send('https://tenor.com/view/bonk-gif-26414884')

                    delete jsonData[userID]

                    fs.writeFileSync('./creepsReminder.json', JSON.stringify(jsonData))
                }
            }
        })
        setTimeout(() => {
            this.discord.client.channels.cache.get('1021462866693464165').messages.fetch('1021471600052281374').then(message => message.edit(creepsMessage + bossMessage))
        }, 7000)
    }

    dhm(t){
        let cd = 24 * 60 * 60 * 1000,
            ch = 60 * 60 * 1000,
            d = Math.floor(t / cd),
            h = Math.floor( (t - d * cd) / ch),
            m = Math.round( (t - d * cd - h * ch) / 60000),
            pad = function(n){ return n < 10 ? '0' + n : n; };
        if( m === 60 ){
            h++;
            m = 0;
        }
        if( h === 24 ){
            d++;
            h = 0;
        }
        return `${d} дней ${pad(h)} часов ${pad(m)} минут`;
    }

    addDays(date, days) {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
}
export {}

module.exports = StateHandler
