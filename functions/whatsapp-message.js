const axios = require("axios");

exports.handler = async function(context, event, callback) {
  global.whatsappImages = global.whatsappImages || [];

  const numMedia = parseInt(event.NumMedia || "0", 10);

  if (numMedia > 0) {
    for (let i = 0; i < numMedia; i++) {
      const mediaUrl = event[`MediaUrl${i}`];
      // Fetch the media as binary
      const res = await axios.get(mediaUrl, {
        responseType: "arraybuffer",
        auth: {
          username: context.ACCOUNT_SID,
          password: context.AUTH_TOKEN
        }
      });

      // Convert to base64 for browser
      const base64 = Buffer.from(res.data, "binary").toString("base64");
      const contentType = res.headers["content-type"];

      global.whatsappImages.push({
        src: `data:${contentType};base64,${base64}`,
        description: event.Body || "WhatsApp photo",
        alt: event.Body || "WhatsApp photo",
        thumbnailWidth: "200px"
      });
    }
  }

  return callback(null, { success: true });
};
