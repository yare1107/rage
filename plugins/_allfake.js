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
      newsletterName: 'RAGE BOT',
    },
	    externalAdReply: {
				    showAdAttribution: true,
					title: botname,
					body: 'Hola',
					mediaUrl: null,
					description: null,
					previewType: "PHOTO",
					thumbnailUrl: 'https://i.ibb.co/TLXSZDL/PERFIL-WHATS-RAGE.png',
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
newsletterName: 'RAGE BOT',
},
externalAdReply: { 
showAdAttribution: true,
title: 'RAGE BOT',
body: 'Powered By Nao',
previewType: "PHOTO",
thumbnailUrl: 'https://i.ibb.co/TLXSZDL/PERFIL-WHATS-RAGE.png',
sourceUrl: 'https://www.instagram.com/08._santiago17',
mediaType: 1,
renderLargerThumbnail: false
},},}
	
}
