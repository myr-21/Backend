import multer from 'multer';

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/temp')
//   },
//   filename: function (req, file, cb) {
    
//     cb(null, file.originalname)
//   }
// })

const storage = multer.diskStorage({
  destination(req, file, cb) {
    console.log("Destination called");
    cb(null, "./public/temp");
  },
  filename(req, file, cb) {
    console.log("Uploading:", file.originalname);
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage })