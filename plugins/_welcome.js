import {WAMessageStubType} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, {conn, participants, groupMetadata}) {
  if (!m.messageStubType || !m.isGroup) return !0;
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://qu.ax/jYQH.jpg')
  let img = await (await fetch(`${pp}`)).buffer()
  let chat = global.db.data.chats[m.chat]

  if (chat.bienvenida && m.messageStubType == 27) {
    if (chat.sWelcome) {
      let user = `@${m.messageStubParameters[0].split`@`[0]}`
      let welcome = chat.sWelcome.replace('@user', () => user);
      await conn.sendAi(m.chat, botname, textbot, welcome, img, img, canal)
    } else {
      let bienvenida = `× RAGE BOT × \n ×× 𝑩𝑰𝑬𝑵𝑽𝑬𝑵𝑰𝑫@ ×× \n    ×  @${m.messageStubParameters[0].split`@`[0]} × \n   ¦ ×  𝑩𝑰𝑬𝑵𝑽𝑬𝑵𝑰𝑫@ 𝑨\n   ¦ ×  ${groupMetadata.subject}\n   ¦ ×  Descripción:\n${groupMetadata.desc || 'sin descripción'}\n\n> RAGE BOT 𝒄𝒐𝒎𝒑𝒂𝒏𝒚...`
      await conn.sendAi(m.chat, botname, textbot, bienvenida, img, img, canal)
    }
  }
  
  if (chat.bienvenida && m.messageStubType == 28) {
    if (chat.sBye) {
      let user = `@${m.messageStubParameters[0].split`@`[0]}`
      let bye = chat.sBye.replace('@user', () => user);
      await conn.sendAi(m.chat, botname, textbot, bye, img, img, canal)
    } else {
      let bye = `× RAGE BOT \n ×× ADIOS 👋 ×× \n    ×  @${m.messageStubParameters[0].split`@`[0]} × \n   ¦ ×   𝑺𝒆 𝒇𝒖𝒆\n   ¦ ×  𝑴𝒆𝒏𝒐𝒔 𝒖𝒏 𝒎𝒐𝒄𝒉𝒐. 𝑴𝒐𝒄𝒉𝒐𝒔 𝒓𝒆𝒔𝒕𝒂𝒏𝒕𝒆𝒔 ${participants.length}\n\n> RAGE BOT 𝒄𝒐𝒎𝒑𝒂𝒏𝒚...`
      await conn.sendAi(m.chat, botname, textbot, bye, img, img, canal)
    }
  }
  
  if (chat.bienvenida && m.messageStubType == 32) {
    if (chat.sBye) {
      let user = `@${m.messageStubParameters[0].split`@`[0]}`
      let bye = chat.sBye.replace('@user', () => user);
      await conn.sendAi(m.chat, botname, textbot, bye, img, img, canal)
    } else {
      let kick = `× RAGE BOT \n ×× 𝑨𝑫𝑰𝑶𝑺 👋 ×× \n    ×  @${m.messageStubParameters[0].split`@`[0]} × \n   ¦ ×   𝑺𝒆 𝒇𝒖𝒆\n   ¦ ×  𝑴𝒆𝒏𝒐𝒔 𝒖𝒏 𝒎𝒐𝒄𝒉𝒐. 𝑴𝒐𝒄𝒉𝒐𝒔 𝒓𝒆𝒔𝒕𝒂𝒏𝒕𝒆𝒔 ${participants.length}\n\n> RAGE BOT 𝒄𝒐𝒎𝒑𝒂𝒏𝒚...`
      await conn.sendAi(m.chat, botname, textbot, kick, img, img, canal)
    }
}}
