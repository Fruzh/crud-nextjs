import { books } from '@/../data';
import fs from 'fs';
import path from 'path';
import formidable from 'formidable';
import { nanoid } from 'nanoid';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    console.log('API index.js - Request method:', req.method);

    if (req.method === 'GET') {
        console.log('Returning books:', books.length);
        res.status(200).json(books);
    } else if (req.method === 'POST') {
        const form = formidable({
            uploadDir: path.join(process.cwd(), 'public/uploads'),
            keepExtensions: true,
            filename: (name, ext) => `book-${nanoid(10)}${ext}`,
            multiples: false,
        });

        try {
            const { fields, files } = await new Promise((resolve, reject) => {
                form.parse(req, (err, fields, files) => {
                    if (err) reject(err);
                    resolve({ fields, files });
                });
            });

            console.log('FormData fields:', fields);
            console.log('FormData files:', JSON.stringify(files, null, 2));

            const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
            const author = Array.isArray(fields.author) ? fields.author[0] : fields.author;
            const category = Array.isArray(fields.category) ? fields.category[0] : fields.category;
            const desc = Array.isArray(fields.desc) ? fields.desc[0] : fields.desc;
            const content = Array.isArray(fields.content) ? fields.content[0] : fields.content;

            if (!title || !author || !category || !desc || !content) {
                console.log('Missing required fields:', { title, author, category, desc, content });
                return res.status(400).json({ error: 'Semua field wajib diisi' });
            }

            let imagePath = null;
            if (files.image) {
                const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
                const filePath = imageFile.filepath || imageFile.path;
                if (!filePath) {
                    console.error('No valid filepath found in files.image:', imageFile);
                    return res.status(400).json({ error: 'Gagal memproses gambar: Tidak ada filepath' });
                }
                const fileName = path.basename(filePath);
                imagePath = `/uploads/${fileName}`;
                console.log('Image processed:', { filePath, fileName, imagePath });
            }
            else {
                console.log('No image uploaded');
            }

            const newBook = {
                id: Date.now(),
                title,
                author,
                category,
                desc,
                content,
                image: imagePath,
            };

            books.push(newBook);

            const dataFilePath = path.join(process.cwd(), 'data.js');
            const updatedData = `let books = ${JSON.stringify(books, null, 2)};\n\nexport { books };`;
            fs.writeFileSync(dataFilePath, updatedData, 'utf8');
            console.log('Updated data.js carregando novo livro:', newBook);

            res.status(201).json(newBook);
        } catch (error) {
            console.error('Error uploading book:', error);
            return res.status(500).json({ error: `Gagal mengunggah buku: ${error.message}` });
        }
    } else {
        console.log('Method not allowed:', req.method);
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}