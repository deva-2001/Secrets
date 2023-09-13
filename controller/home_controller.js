//for production mode only
const path = require("path");
module.exports.getHome = async (req, res) => {
  return res.sendFile(
    path.resolve(__dirname, "..", "client", "build", "index.html")
  );
};
