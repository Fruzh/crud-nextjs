import { books } from '@/../data';
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json(books);
    } else if (req.method === 'POST') {
        const { title, author, desc, content } = req.body;

        const newBook = {
            id: Date.now(),
            title,
            author,
            desc,
            content,
        };

        books.push(newBook);

        const filePath = path.join(process.cwd(), 'data.js');
        const updatedData = `let books = ${JSON.stringify(books, null, 2)};\n\nexport { books };`;
        fs.writeFileSync(filePath, updatedData, 'utf8');

        res.status(201).json(newBook);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}