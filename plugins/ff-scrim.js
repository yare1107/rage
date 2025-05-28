let partidasScrim = {};

const handler = async (m, { conn, args }) => {
    // Verificar si se proporcionaron los argumentos necesarios
    if (args.length < 2) {
        conn.reply(m.chat, '_Debes proporcionar la hora (HH:MM) y el país (MX, CO, CL, AR)._', m);
        return;
    }

    // Validar el formato de la hora
    const horaRegex = /^([01]\d|2[0-3]):?([0-5]\d)$/;
    if (!horaRegex.test(args[0])) {
        conn.reply(m.chat, '_Formato de hora incorrecto. Debe ser HH:MM en formato de 24 horas._', m);
        return;
    }

    const horaUsuario = args[0]; // Hora proporcionada por el usuario
    const pais = args[1].toUpperCase(); // País proporcionado por el usuario

    // Definir la diferencia horaria de cada país con respecto a México
    const diferenciasHorarias = {
        MX: 0, // México tiene la misma hora
        CO: 1, // Colombia tiene una hora más
        CL: 2, // Chile tiene dos horas más
        AR: 3  // Argentina tiene tres horas más
    };

    if (!(pais in diferenciasHorarias)) {
        conn.reply(m.chat, '_País no válido. Usa MX para México, CO para Colombia, CL para Chile o AR para Argentina._', m);
        return;
    }

    // Obtener la diferencia horaria del país seleccionado
    const diferenciaHoraria = diferenciasHorarias[pais];

    // Calcular las cuatro horas consecutivas en cada país según la hora proporcionada y la diferencia horaria
    const hora = parseInt(horaUsuario.split(':')[0], 10);
    const minutos = parseInt(horaUsuario.split(':')[1], 10);

    const horasEnPais = [];
    for (let i = 0; i < 4; i++) {
        const horaActual = new Date();
        horaActual.setHours(hora + i);
        horaActual.setMinutes(minutos);
        horaActual.setSeconds(0);
        horaActual.setMilliseconds(0);

        const horaEnPais = new Date(horaActual.getTime() - (3600000 * diferenciaHoraria)); // Restar la diferencia horaria
        horasEnPais.push(horaEnPais);
    }

    // Formatear las horas según el formato de 24 horas y obtener solo la hora y minutos
    const formatTime = (date) => date.toLocaleTimeString('es', { hour12: false, hour: '2-digit', minute: '2-digit' });

    const horaActual = formatTime(new Date()); // Obtener la hora actual sin modificación

    const message = `
*SCRIM*

𝐇𝐎𝐑𝐀𝐑𝐈𝐎

🇲🇽 𝐌𝐄𝐗𝐈𝐂𝐎 : ${formatTime(horasEnPais[0])}
🇨🇴 𝐂𝐎𝐋𝐎𝐌𝐁𝐈𝐀 : ${formatTime(horasEnPais[1])}
🇨🇱 𝐂𝐇𝐈𝐋𝐄 : ${formatTime(horasEnPais[2])}
🇦🇷 𝐀𝐑𝐆𝐄𝐍𝐓𝐈𝐍𝐀 : ${formatTime(horasEnPais[3])}

Casilla:

𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔

👑 ┇ 
🥷🏻 ┇  
🥷🏻 ┇ 
🥷🏻 ┇ 


ㅤʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄:
🥷🏻 ┇ 
🥷🏻 ┇

(𝚁𝚎𝚊𝚌𝚌𝚒𝚘𝚗𝚊 𝚌𝚘𝚗 ❤️ 𝚙𝚊𝚛𝚊 𝚞𝚗𝚒𝚛𝚝𝚎 𝚊 𝚕𝚊 𝚎𝚜𝚌𝚞𝚊𝚍𝚛𝚊)
(𝚁𝚎𝚊𝚌𝚌𝚒𝚘𝚗𝚊 𝚌𝚘𝚗 😂 𝚙𝚊𝚛𝚊 𝚜𝚎𝚛 𝚜𝚞𝚙𝚕𝚎𝚗𝚝𝚎)
`.trim();
    
    let msg = await conn.sendMessage(m.chat, { text: message }, { quoted: m });
    
    // Guardar información de la partida
    partidasScrim[msg.key.id] = {
        chat: m.chat,
        jugadores: [],
        suplentes: [],
        horarios: {
            mexico: formatTime(horasEnPais[0]),
            colombia: formatTime(horasEnPais[1]),
            chile: formatTime(horasEnPais[2]),
            argentina: formatTime(horasEnPais[3]),
            actual: horaActual
        },
        originalMsg: msg,
    };
};

handler.help = ['scrim']
handler.tags = ['freefire']
handler.command = /^(scrim|scrims|vsscrims|vsscrim)$/i;

// Función para manejar las reacciones
handler.before = async function (m) {
    if (!m.message?.reactionMessage) return false
    
    let reaction = m.message.reactionMessage
    let key = reaction.key
    let emoji = reaction.text
    let sender = m.key.participant || m.key.remoteJid
    let operation = reaction.operation || 'add' // 'add' para agregar, 'remove' para quitar

    // Verificar si existe la partida
    if (!partidasScrim[key.id]) return false

    let data = partidasScrim[key.id]
    let wasInJugadores = data.jugadores.includes(sender)
    let wasInSuplentes = data.suplentes.includes(sender)
    let shouldUpdate = false

    // Si es operación de remover reacción
    if (operation === 'remove') {
        if (wasInJugadores) {
            data.jugadores = data.jugadores.filter(u => u !== sender)
            shouldUpdate = true
        } else if (wasInSuplentes) {
            data.suplentes = data.suplentes.filter(u => u !== sender)
            shouldUpdate = true
        }
    } 
    // Si es operación de agregar reacción
    else if (operation === 'add') {
        // Si el usuario ya está en alguna lista, lo removemos primero (cambio de reacción)
        if (wasInJugadores) {
            data.jugadores = data.jugadores.filter(u => u !== sender)
        } else if (wasInSuplentes) {
            data.suplentes = data.suplentes.filter(u => u !== sender)
        }

        // Lógica para diferentes emojis
        if (['❤️', '👍🏻', '❤', '👍'].includes(emoji)) {
            // Para jugadores principales
            if (data.jugadores.length < 4) {
                data.jugadores.push(sender)
                shouldUpdate = true
            } else if (!wasInJugadores && !wasInSuplentes) {
                return false // Lista de jugadores llena y es usuario nuevo
            }
        } else if (emoji === '😂') {
            // Para suplentes
            if (data.suplentes.length < 2) {
                data.suplentes.push(sender)
                shouldUpdate = true
            } else if (!wasInJugadores && !wasInSuplentes) {
                return false // Lista de suplentes llena y es usuario nuevo
            }
        } else {
            // Emoji no válido, si estaba en alguna lista lo mantenemos
            if (wasInJugadores && data.jugadores.length < 4) {
                data.jugadores.push(sender)
            } else if (wasInSuplentes && data.suplentes.length < 2) {
                data.suplentes.push(sender)
            }
            return false
        }
    }

    // Solo actualizar si hubo cambios
    if (!shouldUpdate) return false

    // Crear las menciones para jugadores y suplentes
    let jugadores = data.jugadores.map(u => `@${u.split('@')[0]}`)
    let suplentes = data.suplentes.map(u => `@${u.split('@')[0]}`)

    let plantilla = `
*SCRIM*

𝐇𝐎𝐑𝐀𝐑𝐈𝐎

🇲🇽 𝐌𝐄𝐗𝐈𝐂𝐎 : ${data.horarios.mexico}
🇨🇴 𝐂𝐎𝐋𝐎𝐌𝐁𝐈𝐀 : ${data.horarios.colombia}
🇨🇱 𝐂𝐇𝐈𝐋𝐄 : ${data.horarios.chile}
🇦🇷 𝐀𝐑𝐆𝐄𝐍𝐓𝐈𝐍𝐀 : ${data.horarios.argentina}

Casilla: 

𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔

👑 ┇ ${jugadores[0] || ''}
🥷🏻 ┇ ${jugadores[1] || ''}
🥷🏻 ┇ ${jugadores[2] || ''}
🥷🏻 ┇ ${jugadores[3] || ''}


ㅤʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄:
🥷🏻 ┇ ${suplentes[0] || ''}
🥷🏻 ┇ ${suplentes[1] || ''}

${data.jugadores.length < 4 || data.suplentes.length < 2 ? '(𝚁𝚎𝚊𝚌𝚌𝚒𝚘𝚗𝚊 𝚌𝚘𝚗 ❤️ 𝚙𝚊𝚛𝚊 𝚞𝚗𝚒𝚛𝚝𝚎 𝚊 𝚕𝚊 𝚎𝚜𝚌𝚞𝚊𝚍𝚛𝚊)\n(𝚁𝚎𝚊𝚌𝚌𝚒𝚘𝚗𝚊 𝚌𝚘𝚗 😂 𝚙𝚊𝚛𝚊 𝚜𝚎𝚛 𝚜𝚞𝚙𝚕𝚎𝚗𝚝𝚎)' : '✅ 𝐋𝐈𝐒𝐓𝐀 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐀'}
    `.trim()

    try {
        await this.sendMessage(data.chat, {
            text: plantilla,
            edit: data.originalMsg.key,
            mentions: [...data.jugadores, ...data.suplentes]
        })
    } catch (error) {
        console.error('Error al editar mensaje:', error)
    }

    return false
}

export default handler;