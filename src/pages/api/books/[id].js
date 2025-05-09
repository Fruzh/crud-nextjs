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
    const { id } = req.query;
    const bookIndex = books.findIndex((book) => book.id.toString() === id);

    console.log('API [id].js - Request method:', req.method, 'ID:', id);

    if (req.method === 'GET') {
        if (bookIndex === -1) {
            console.log('Book not found for ID:', id);
            return res.status(404).json({ error: 'Book not found' });
        }
        console.log('Returning book:', books[bookIndex]);
        return res.status(200).json(books[bookIndex]);
    }

    if (req.method === 'PUT') {
        if (bookIndex === -1) {
            console.log('Book not found for ID:', id);
            return res.status(404).json({ error: 'Book not found' });
        }

        const form = formidable({
            uploadDir: path.join(process.cwd(), 'public/uploads'),
            keepExtensions: true,
            filename: (name, ext) => `book-${nanoid(10)}${ext}`,
        });

        try {
            const { fields, files } = await new Promise((resolve, reject) => {
                form.parse(req, (err, fields, files) => {
                    if (err) reject(err);
                    resolve({ fields, files });
                });
            });

            console.log('FormData fields:', fields, 'Files:', files);

            const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
            const author = Array.isArray(fields.author) ? fields.author[0] : fields.author;
            const category = Array.isArray(fields.category) ? fields.category[0] : fields.category;
            const desc = Array.isArray(fields.desc) ? fields.desc[0] : fields.desc;
            const content = Array.isArray(fields.content) ? fields.content[0] : fields.content;

            if (!title || !author || !category || !desc || !content) {
                console.log('Missing required fields:', { title, author, category, desc, content });
                return res.status(400).json({ error: 'Semua field wajib diisi' });
            }

            let newImagePath = books[bookIndex].image;

            if (files.image) {
                const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;

                if (!imageFile.mimetype || !imageFile.mimetype.startsWith('image/')) {
                    console.log('Invalid file type:', imageFile.mimetype);
                    return res.status(400).json({ error: 'File harus berupa gambar' });
                }

                // Hapus gambar lama jika ada
                if (books[bookIndex].image) {
                    const oldImagePath = path.join(process.cwd(), 'public', books[bookIndex].image);
                    try {
                        fs.unlinkSync(oldImagePath);
                        console.log('Deleted old image:', oldImagePath);
                    } catch (err) {
                        console.warn('Failed to delete old image:', err.message);
                    }
                }

                // Buat nama baru dan path tujuan
                const ext = path.extname(imageFile.originalFilename || '');
                const newFilename = `book-${nanoid(10)}${ext}`;
                const destPath = path.join(process.cwd(), 'public/uploads', newFilename);

                // Pindahkan file dari tmp ke tujuan
                fs.renameSync(imageFile.filepath, destPath);
                console.log('Saved new image to:', destPath);

                newImagePath = `/uploads/${newFilename}`;
            }


            // Perbarui data buku
            books[bookIndex] = {
                ...books[bookIndex],
                title,
                author,
                category,
                desc,
                content,
                image: newImagePath,
            };

            const filePath = path.join(process.cwd(), 'data.js');
            const updatedData = `let books = ${JSON.stringify(books, null, 2)};\n\nexport { books };`;
            fs.writeFileSync(filePath, updatedData, 'utf8');
            console.log('Updated data.js with book:', books[bookIndex]);

            return res.status(200).json(books[bookIndex]);
        } catch (error) {
            console.error('Error updating book:', error);
            return res.status(500).json({ error: `Gagal memperbarui buku: ${error.message}` });
        }
    }


    if (req.method === 'DELETE') {
        if (bookIndex === -1) {
            console.log('Book not found for ID:', id);
            return res.status(404).json({ error: 'Book not found' });
        }

        // Hapus gambar jika ada
        if (books[bookIndex].image) {
            const imagePath = path.join(process.cwd(), 'public', books[bookIndex].image);
            try {
                fs.unlinkSync(imagePath);
                console.log('Deleted image:', imagePath);
            } catch (err) {
                console.warn('Failed to delete image:', err.message);
            }
        }

        const deletedBook = books.splice(bookIndex, 1)[0];
        console.log('Deleted book:', deletedBook);

        const filePath = path.join(process.cwd(), 'data.js');
        const updatedData = `let books = ${JSON.stringify(books, null, 2)};\n\nexport { books };`;
        fs.writeFileSync(filePath, updatedData, 'utf8');
        console.log('Updated data.js after deletion');

        return res.status(200).json({ message: 'Book deleted successfully' });
    }

    console.log('Method not allowed:', req.method);
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}