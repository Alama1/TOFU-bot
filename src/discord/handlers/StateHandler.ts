const stateHandlerDiscord = require('../DiscordManager')
const fs = require('fs');

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
        fs.readFile('./bossReminder.json', 'utf-8', async (err, data) => {
            let jsonData = JSON.parse(data)
            for (const [userID, time] of Object.entries(jsonData)) {
                const date = new Date(+time)

                if (this.addDays(date, 7).getTime() < Date.now()) {
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
                const date = new Date(+time)
                if (this.addDays(date, 3).getTime() < Date.now()) {
                    const user = await this.discord.client.users.fetch(userID).catch(() => null);
                    await user.send('Крипочки зареспавнились, время пришло.')
                    await user.send('https://tenor.com/view/bonk-gif-26414884')

                    delete jsonData[userID]

                    fs.writeFileSync('./creepsReminder.json', JSON.stringify(jsonData))
                }
            }
        })
    }

    addDays(date, days) {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
}
export {}

module.exports = StateHandler
