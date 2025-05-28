let partidasGDC = {};

let handler = async (m, { isPrems, conn }) => {
let time = global.db.data.users[m.sender].lastcofre + 0 // 36000000 10 Horas //86400000 24 Horas
if (new Date - global.db.data.users[m.sender].lastcofre < 0) throw `[❗𝐈𝐍𝐅𝐎❗] 𝚈𝙰 𝚁𝙴𝙲𝙻𝙰𝙼𝙰𝚂𝚃𝙴 𝚃𝚄 𝙲𝙾𝙵𝚁𝙴\𝚗𝚅𝚄𝙴𝙻𝚅𝙴 𝙴𝙽 *${msToTime(time - new Date())}* 𝙿𝙰𝚁𝙰 𝚅𝙾𝙻𝚅𝙴𝚁 𝙰 𝚁𝙴𝙲𝙻𝙰𝙼𝙰𝚁`

let img = 'https://qu.ax/msPxh.jpg' 
let texto = `
       𝙇𝙞𝙨𝙩𝙖 𝙂𝙪𝙚𝙧𝙧𝙖 𝙙𝙚 𝘾𝙡𝙖𝙣𝙚𝙨

 ¬ 𝐉𝐔𝐆𝐀𝐃𝐎𝐑𝐄𝐒 𝐏𝐑𝐄𝐒𝐄𝐍𝐓𝐄𝐒

    
          𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 1
    
    👑 ┇ 
    🥷🏻 ┇  
    🥷🏻 ┇ 
    🥷🏻 ┇ 
          
         𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 2
    
    👑 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇ 

         𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 3
    
    👑 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇ 

         𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 4
    
    👑 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇ 

         𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 5
    
    👑 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇ 

         𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 6
    
    👑 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇  

	     𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 7
    
    👑 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇  

	     𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 8
    
    👑 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇  

	     𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 9
    
    👑 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇  

         𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 10
    
    👑 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇ 
    🥷🏻 ┇  

(𝚁𝚎𝚊𝚌𝚌𝚒𝚘𝚗𝚊 𝚌𝚘𝚗 ❤️ 𝚙𝚊𝚛𝚊 𝚞𝚗𝚒𝚛𝚝𝚎)
	`

const fkontak = {
	"key": {
    "participants":"0@s.whatsapp.net",
		"remoteJid": "status@broadcast",
		"fromMe": false,
		"id": "Halo"
	},
	"message": {
		"contactMessage": {
			"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
		}
	},
	"participant": "0@s.whatsapp.net"
}

let msg = await conn.sendFile(m.chat, img, 'hades.jpg', texto, fkontak)

// Guardar información de la partida
partidasGDC[msg.key.id] = {
  chat: m.chat,
  escuadras: Array(10).fill().map(() => []), // 10 escuadras, cada una con array de jugadores
  originalMsg: msg,
}

global.db.data.users[m.sender].lastcofre = new Date * 1
}

handler.help = ['guerradeclanes']
handler.tags = ['freefire']
handler.command = ['listagdc'] 
handler.register = true
handler.admin = true

// Función para manejar las reacciones
handler.before = async function (m) {
  if (!m.message?.reactionMessage) return false
  
  let reaction = m.message.reactionMessage
  let key = reaction.key
  let emoji = reaction.text
  let sender = m.key.participant || m.key.remoteJid

  // Solo procesar reacciones de corazón o pulgar arriba
  if (!['❤️', '👍🏻', '❤', '👍'].includes(emoji)) return false
  
  // Verificar si existe la partida
  if (!partidasGDC[key.id]) return false

  let data = partidasGDC[key.id]

  // Verificar si el usuario ya está en alguna escuadra
  let usuarioEnEscuadra = false
  for (let i = 0; i < data.escuadras.length; i++) {
    if (data.escuadras[i].includes(sender)) {
      usuarioEnEscuadra = true
      break
    }
  }
  
  if (usuarioEnEscuadra) return false

  // Buscar la primera escuadra disponible
  let escuadraDisponible = -1
  for (let i = 0; i < data.escuadras.length; i++) {
    if (data.escuadras[i].length < 4) {
      escuadraDisponible = i
      break
    }
  }

  // Si no hay escuadras disponibles, no hacer nada
  if (escuadraDisponible === -1) return false

  // Agregar usuario a la escuadra disponible
  data.escuadras[escuadraDisponible].push(sender)

  // Crear plantilla actualizada
  let plantilla = `
       𝙇𝙞𝙨𝙩𝙖 𝙂𝙪𝙚𝙧𝙧𝙖 𝙙𝙚 𝘾𝙡𝙖𝙣𝙚𝙨

 ¬ 𝐉𝐔𝐆𝐀𝐃𝐎𝐑𝐄𝐒 𝐏𝐑𝐄𝐒𝐄𝐍𝐓𝐄𝐒

    `

  // Generar cada escuadra
  for (let i = 0; i < 10; i++) {
    plantilla += `
         𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 ${i + 1}
    
    👑 ┇ ${data.escuadras[i][0] ? `@${data.escuadras[i][0].split('@')[0]}` : ''}
    🥷🏻 ┇ ${data.escuadras[i][1] ? `@${data.escuadras[i][1].split('@')[0]}` : ''}
    🥷🏻 ┇ ${data.escuadras[i][2] ? `@${data.escuadras[i][2].split('@')[0]}` : ''}
    🥷🏻 ┇ ${data.escuadras[i][3] ? `@${data.escuadras[i][3].split('@')[0]}` : ''}
`
    if (i === 4) plantilla += '\n' // Espacio extra después de la escuadra 5
  }

  // Verificar si todas las escuadras están llenas
  let todasLlenas = data.escuadras.every(escuadra => escuadra.length === 4)
  
  plantilla += `
${todasLlenas ? '✅ 𝐓𝐎𝐃𝐀𝐒 𝐋𝐀𝐒 𝐄𝐒𝐂𝐔𝐀𝐃𝐑𝐀𝐒 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐀𝐒' : '(𝚁𝚎𝚊𝚌𝚌𝚒𝚘𝚗𝚊 𝚌𝚘𝚗 ❤️ 𝚙𝚊𝚛𝚊 𝚞𝚗𝚒𝚛𝚝𝚎)'}
  `

  // Obtener todas las menciones
  let allMentions = []
  data.escuadras.forEach(escuadra => {
    allMentions.push(...escuadra)
  })

  try {
    await this.sendMessage(data.chat, {
      text: plantilla.trim(),
      edit: data.originalMsg.key,
      mentions: allMentions
    })
  } catch (error) {
    console.error('Error al editar mensaje:', error)
  }

  return false
}

export default handler
