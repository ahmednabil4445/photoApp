
const multer  = require('multer')
const { v4: uuidv4 } = require('uuid');

module.exports.uploadImg=(filedName)=>{


    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
          cb(null, uuidv4()+'-'+file.originalname )
        }
      });

      function fileFilter(req,file,cb){
        if(file.mimetype.startsWith("image")){
          cb(null,true)
        }else{
          cb(null,true)
        }
      }
      
      const upload = multer({ storage,fileFilter })
      return upload.single(filedName)


}