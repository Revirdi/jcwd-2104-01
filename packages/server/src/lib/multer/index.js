const multer = require('multer');
const path = require('path');
const appRoot = require('app-root-path');

const postPath = path.join(
  appRoot.path,
  'packages',
  'server',
  'public',
  'user',
);

const storageUser = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, postPath);
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const uploadUser = multer({
  storage: storageUser,
  limits: {
    fileSize: 1048576, // Byte, 1 MB
  },
  fileFilter(req, file, cb) {
    const allowedExtension = ['.png', '.jpg', '.gif'];

    const extname = path.extname(file.originalname);

    if (!allowedExtension.includes(extname)) {
      const error = new Error('Please upload image file (jpg, png, gif)');
      return cb(error);
    }

    cb(null, true);
  },
});

const prescriptionPath = path.join(
  appRoot.path,
  'packages',
  'server',
  'public',
  'prescription',
);

const storagePrescription = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, prescriptionPath);
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const uploadPrescription = multer({
  storage: storagePrescription,
  limits: {
    fileSize: 2097152,
  },
  fileFilter(req, file, cb) {
    const allowedExtension = ['.png', '.jpg'];
    const extname = path.extname(file.originalname);
    if (!allowedExtension.includes(extname)) {
      const error = new Error(
        'Bentuk file yang diterima hanya dalam format (.jpg & .png) ',
      );
      return cb(error);
    }

    cb(null, true);
  },
});

const paymentPath = path.join(
  appRoot.path,
  'packages',
  'server',
  'public',
  'payment',
);

const storagePayment = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, paymentPath);
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const uploadPayment = multer({
  storage: storagePayment,
  limits: {
    fileSize: 2097152,
  },
  fileFilter(req, file, cb) {
    const allowedExtension = ['.png', '.jpg'];
    const extname = path.extname(file.originalname);
    if (!allowedExtension.includes(extname)) {
      const error = new Error(
        'Bentuk file yang diterima hanya dalam format (.jpg & .png) ',
      );
      return cb(error);
    }

    cb(null, true);
  },
});

module.exports = { uploadUser, uploadPrescription, uploadPayment };
