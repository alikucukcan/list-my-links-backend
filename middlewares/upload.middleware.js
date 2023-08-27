const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let mime = file.mimetype.split("/")[0]; // -> "image/jpg" -> [ "image","jpg" ] -> "image"
    if (mime != "image") {
      cb(new Error("This is not a image", null));
      return;
    }

    if (file.size > 1024 * 1024 * 3) {
      cb(new Error("File is too big", null));
      return;
    }

    cb(null, __dirname + "/../public");
  },
  filename: function (req, file, cb) {
    const id = req.user._id;
    cb(null, id + ".png");
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
