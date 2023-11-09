const TelegramBot = require('node-telegram-bot-api'),
    { key, auth } = require('./config'),
    client = new TelegramBot(key, {
        polling: true,
        badRejection: false
    }),
    os = require("os"),
    pty = require("node-pty"),
    shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';
let term = pty.spawn(shell, [
    "ls\n"
], {});
term.on('data', async function(data) {
    await console.log(data)
})

client.on('message', async function (msg) {
    console.log(msg)
    if (await msg.from.username === 'Ms_Meg' || await msg.from.username === 'piurg') {
        try {
            let date = new Date();
            let num = date.getDate()
            if (msg.text === 'end'){
                await client.sendMessage(msg.chat.id, 'Выключаем...')
                await client.deleteWebHook({
                    drop_pending_updates: true
                }).then(() => process.exit(200))
            }
            else if (msg.text.toString() === 'launch'){
                try{
                    // await term.write( 'shed_up\n');
                    // await term.write( `docker run -it --rm --name prodInfo${num} -v /home/archives/IgorP/source/productInfo/:/usr/src/app -w /usr/src/app node:20 node index.js\n`);
                    await term.write(`docker run -it --rm --name prodInfo${num} -v /home/archives/IgorP/source/productInfo/:/usr/src/app -w /usr/src/app node:20 node index.js\n`)
                    await client.sendMessage(msg.chat.id, 'Запущен')
                }catch (e) {
                    console.log(e)
                }
            } else {
                await client.sendMessage(msg.chat.id, 'Не найдено, проверь ввод')
            }
        }catch (e) {

        }
    }
});
