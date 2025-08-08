const { cmd, commands } = require("../command");
const config = require('../config');
const os = require('os'); // To get RAM info
const moment = require('moment'); // For uptime formatting

cmd(
  {
    pattern: "menu",
    alias: ["getmenu"],
    react: "📜",
    desc: "Get bot command list",
    category: "main",
    filename: __filename,
  },
  async (malvin, mek, m, { from, pushname, sender, reply }) => {
    try {
      // Calculate dynamic values
      const uptime = moment.duration(process.uptime() * 1000).humanize();
      const totalRam = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2) + " GB";
      const usedRam = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + " MB";
      const owner = config.OWNER_NUMBER || "Unknown"; // fallback
      const user = pushname || sender.split("@")[0];

      // Create menu categories
      let menu = {
        main: "",
        download: "",
        group: "",
        owner: "",
        convert: "",
        search: "",
      };

      for (let i = 0; i < commands.length; i++) {
        const oneCmd = commands[i]; // <== changed cmd -> oneCmd
        if (oneCmd.pattern && !oneCmd.dontAddCommandList) {
          const line = `┃   ▪️ ${config.PREFIX}${oneCmd.pattern}\n`;
          if (menu[oneCmd.category]) {
            menu[oneCmd.category] += line;
          }
        }
      }

      const madeMenu = `𝐘𝐨𝐨  ${user}
*Wᴇʟᴄᴏᴍᴇ Tᴏ 𝗡𝗘𝗢𝗡 𝗫𝗠𝗗* 

╭─「 🛠️ ꜱᴛᴀᴛᴜꜱ ᴅᴇᴛᴀɪʟꜱ 」 
│🤖 *Bot*: 𝗡𝗘𝗢𝗡 𝗫𝗠𝗗
│🙋‍♂️ *User*: ${user}
│📱 *Owner*: NIMESHKA MIHIRAN
│⏳ *Uptime*: ${uptime}
│💾 *Ram*: ${usedRam} / ${totalRam}
│🛎️ *Prefix*: ${config.PREFIX}
╰──────────●●►

╭─「 📜 ᴍᴇɴᴜ ᴏᴘᴛɪᴏɴꜱ 」 →→
│ ⚙️ *MAIN COMMANDS*
│   ➥ .alive 
│   ➥ .menu 
│   ➥ .ai <text> 
│  ╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
│ 📥 *DOWNLOAD COMMANDS*→→
│   ➥ .song <text> 
│   ➥ .video <text> 
│   ➥ .fb <link> 
    ➥ .tiktok <link>
│╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
│ 👑 *OWNER COMMANDS*
│   ➥ .restart 
│   ➥ .update 
│╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
│ 🔁 *CONVERT COMMANDS*
│   ➥ .sticker <reply img> 
│   ➥ .img <reply sticker> 
│   ➥ .tr <lang> <text>
│   ➥ .tts <text> 
╰──────────●●►

▯𝙶𝙸𝚅𝙴 𝚈𝙾𝚄𝙴𝚁 𝚂𝚄𝙿 →→https://whatsapp.com/channel/0029Vb6BQQmFnSz7bmxefu40▯

> *POWERED BY 𝗡𝗜𝗠𝗘𝗦𝗛𝗞𝗔 𝗠𝗜𝗛𝗜𝗥𝗔𝗡*
`;

      await malvin.sendMessage(
        from,
        {
          image: {
            url: "https://files.catbox.moe/pf7ytb.jpg",
          },
          caption: madeMenu,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply("❌ Menu error:\n" + e.message);
    }
  }
);
