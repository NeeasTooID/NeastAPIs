const fs = require("fs");

global.creator = "Npnpicy";
global.apikey = ["Npc", "909909", "YusupKakuu", "LinucxMD"];

let file = require.resolve(__filename);
fs.watchFile(file, () => {
	fs.unwatchFile(file);
	console.log(`Update'${__filename}'`);
	delete require.cache[file];
	require(file);
});
