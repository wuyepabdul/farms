import express from "express";
import path from "path";
import multer from "multer";

const router = express.Router();

// initialize multer storage engine
const storage = multer.diskStorage({
  //file storage destination
  destination(req, file, cb) {
    cb(null, "uploads/");
  },

  //filename
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// check for file type
function checkFileType(file, cb) {
  //expression to run a test
  const fileType = /jpg|jpeg|png/;

  // check for file extension name
  const extname = fileType.test(path.extname(file.originalname).toLowerCase());

  // check for file mimetype
  const mimetype = fileType.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb("Images only");
  }
}

//initalise multer middleware
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

//upload route
router.post("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
