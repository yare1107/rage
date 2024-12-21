const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command }) => {
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  const pesan = args.join` `;
  const groupMetadata = await conn.groupMetadata(m.chat);
  const groupName = groupMetadata.subject;

  const countryFlags = {
    '52': '🇲🇽', // México
    '57': '🇨🇴', // Colombia
    '54': '🇦🇷', // Argentina
    '34': '🇪🇸', // España
    '55': '🇧🇷', // Brasil
    '1':  '🇺🇸', // Estados Unidos
    '44': '🇬🇧', // Reino Unido
    '91': '🇮🇳', // India
    '502': '🇬🇹', // Guatemala
    '56': '🇨🇱', // Chile
    '51': '🇵🇪', // Perú
    '58': '🇻🇪', // Venezuela
    '505': '🇳🇮', // Nicaragua
    '593': '🇪🇨', // Ecuador
    '504': '🇭🇳', // Honduras
    '591': '🇧🇴', // Bolivia
    '53': '🇨🇺', // Cuba
    '503': '🇸🇻', // El Salvador
    '507': '🇵🇦', // Panamá
    '595': '🇵🇾', // Paraguay
  };
  
  const getCountryFlag = (id) => {
    const phoneNumber = id.split('@')[0];
    let phonePrefix = phoneNumber.slice(0, 3);

    if (phoneNumber.startsWith('1')) return '🇺🇸';

    if (!countryFlags[phonePrefix]) {
      phonePrefix = phoneNumber.slice(0, 2);
    }

    return countryFlags[phonePrefix] || '🏳️‍🌈'; 
  };

  let teks = `*${groupName}*\n\n`;
  teks += `*Integrantes : ${participants.length}*\n`;
  teks += `${pesan}\n┌──⭓ *Despierten*\n`;

  for (const mem of participants) {
    const flag = getCountryFlag(mem.id);
    teks += `👑 ${flag} @${mem.id.split('@')[0]}\n`;
  }

  teks += `└───────⭓\n\n𝘚𝘶𝘱𝘦𝘳 𝘚𝘪𝘴𝘬𝘦𝘥 𝘉𝘰𝘵 𝘞𝘩𝘢𝘵𝘴𝘈𝘱𝘱 🚩`;

  await conn.sendMessage(m.chat, { 
    text: teks,
    mentions: participants.map((a) => a.id)
  });
};

handler.help = ['todos'];
handler.tags = ['group'];
handler.command = /^(tagall|invocar|marcar|todos|invocación)$/i;
handler.admin = true;
handler.group = true;

export default handler;
