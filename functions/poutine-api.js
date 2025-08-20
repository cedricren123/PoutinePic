exports.handler = async function(context, event, callback) {
  const gallery = global.whatsappImages || [];
  return callback(null, gallery);
};
