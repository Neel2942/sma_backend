import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { parse, join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const imageUpload = async (parent, { file }, context, info) => {
  console.log(file);
  const { filename, createReadStream } = await file;
  let stream = createReadStream();
  let { ext, name } = parse(filename);

  // Corrected name construction
  name = name.replace(/[^a-z0-9]+/gi, '-');
  name = name.length > 1 ? name : `file_${Date.now()}`;

  // Ensure the uploads directory exists
  const uploadDir = join(__dirname, '../../uploads');
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
  }

  const serverFile = join(uploadDir, `${name}-${Date.now()}${ext}`);
  const writeStream = createWriteStream(serverFile);

  // Use a promise to handle the completion of the write operation
  await new Promise((resolve, reject) => {
    stream.pipe(writeStream);
    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });

  const fileUrl = `http://localhost:4000/uploads/${serverFile.split('uploads')[1]}`;
  return fileUrl;
};

export default imageUpload;
