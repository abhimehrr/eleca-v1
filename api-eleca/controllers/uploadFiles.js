const multer = require("multer");
const path = require("path")

module.exports = multer({
  storage: multer.diskStorage({
    destination: (req, file, next) => {
      next(null, path.join(__dirname, "../static/images"));
    },
    filename: (req, file, next) => {
      next(null, file.originalname);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});