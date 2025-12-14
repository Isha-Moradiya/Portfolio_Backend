import multer from "multer";
import mime from "mime-types";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate unique filename
const generateFileName = (file) => {
  const ext = mime.extension(file.mimetype) || "bin";
  return `${file.fieldname}-${Date.now()}-${Math.round(
    Math.random() * 1e9
  )}.${ext}`;
};

// Create uploader (same API as your S3 version)
const getUploader = (folderName) => {
  // Folder path
  const uploadDir = path.join(__dirname, "..", "..", "uploads", folderName);

  // Ensure folder exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Configure multer storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const fileName = generateFileName(file);
      cb(null, fileName);
    },
  });

  return multer({ storage });
};

export default getUploader;
