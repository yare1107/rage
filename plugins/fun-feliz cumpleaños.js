/* By Sant */

const handler = async (m, {conn, text}) => {
  m.reply(`*> "${pickRandom(global.felizcumpleaños)}"*\n\n𝑨𝒎𝒆𝒓𝒊 𝑩𝒐𝒕`);
};
handler.help = ['felizcumpleaños']
handler.tags = ['fun'];
handler.command = ['felizcumpleaños'];
export default handler;

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}

global.felizcumpleaños = [' Feliz cumpleaños! Espero que tengas un día lleno de amor, risas y felicidad.', ' ¡Que tengas un cumpleaños inolvidable! Estoy pensando en ti en este especial día.', ' Feliz cumpleaños, amigo/a. Que este día sea el comienzo de un año lleno de aventuras y logros.', ' En este día tan especial, quiero recordarte cuánto significa para mí tenerte en mi vida. Feliz cumpleaños.', ' Que tu cumpleaños sea un día de reflexión, gratitud y celebración de la vida. Te quiero.', ' Estoy agradecido/a por tu amistad y tu presencia en mi vida. Feliz cumpleaños.', ' ¡Feliz cumpleaños! Ahora eres oficialmente más viejo/a, pero no más sabio/a.', ' Que tu cumpleaños sea tan divertido como tú. ¡Disfruta al máximo!', ' ¡Un año más, un año mejor! (O al menos eso espero).'];
