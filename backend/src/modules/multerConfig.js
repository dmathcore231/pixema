const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: 'public/posters',
  filename: function (req, file, cb) {
    cb(null, null)
  }
})

const upload = multer({ storage })

module.exports = upload
