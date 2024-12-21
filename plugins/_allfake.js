import fetch from 'node-fetch'

export async function before(m, { conn }) {
//let img = await (await fetch(`https://tinyurl.com/2c5hk765`)).buffer()
let img = catalogo
 global.fake = {
    contextInfo: {
    	isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "canalid",
      serverMessageId: 100,
      newsletterName: '𝙎𝘼𝙉𝙏 𝘽𝙊𝙏',
    },
	    externalAdReply: {
				    showAdAttribution: true,
					title: botname,
					body: 'Hola',
					mediaUrl: null,
					description: null,
					previewType: "PHOTO",
					thumbnailUrl: 'https://i.ibb.co/27rdXbJ/bot.jpg',
		           sourceUrl: canal,
		           mediaType: 1,
                   renderLargerThumbnail: false
	    },
    },
  }

 global.adReply = {
	    contextInfo: { 
             forwardingScore: 9999, 
                 isForwarded: false, 
                    externalAdReply: {
				    showAdAttribution: true,
					title: botname,
					body: textbot,
					mediaUrl: null,
					description: null,
					previewType: "PHOTO",
					thumbnailUrl: img,
                    thumbnail: img,
		           sourceUrl: canal,
		           mediaType: 1,
                   renderLargerThumbnail: true
				}
			}
		}

global.rcanal = {
contextInfo: {
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: "canalid",
serverMessageId: 100,
newsletterName: '𝙎𝘼𝙉𝙏 𝘽𝙊𝙏',
},
externalAdReply: { 
showAdAttribution: true,
title: '⟢◦ 𝐍𝐅 𝐁𝐎𝐓',
body: 'Powered By Nao',
previewType: "PHOTO",
thumbnailUrl: 'https://i.ibb.co/27rdXbJ/bot.jpg',
sourceUrl: 'https://www.instagram.com/08._santiago17',
mediaType: 1,
renderLargerThumbnail: false
},},}
	
}
