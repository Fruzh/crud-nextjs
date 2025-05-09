import { books } from '@/../data';
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const { id } = req.query;
    const bookId = parseInt(id);
    const bookIndex = books.findIndex((book) => book.id === bookId);

    if (req.method === 'GET') {
        if (bookIndex === -1) return res.status(404).json({ message: 'Book not found' });
        return res.status(200).json(books[bookIndex]);
    }

    if (req.method === 'PUT') {
        if (bookIndex === -1) return res.status(404).json({ message: 'Book not found' });

        const { title, author, category, desc, content } = req.body;
        books[bookIndex] = { ...books[bookIndex], title, author, category, desc, content };

        const filePath = path.join(process.cwd(), 'data.js');
        const updatedData = `let books = ${JSON.stringify(books, null, 2)};\n\nexport { books };`;
        fs.writeFileSync(filePath, updatedData, 'utf8');

        return res.status(200).json(books[bookIndex]);
    }

    if (req.method === 'DELETE') {
        if (bookIndex === -1) return res.status(404).json({ message: 'Book not found' });

        books.splice(bookIndex, 1);

        const filePath = path.join(process.cwd(), 'data.js');
        const updatedData = `let books = ${JSON.stringify(books, null, 2)};\n\nexport { books };`;
        fs.writeFileSync(filePath, updatedData, 'utf8');

        return res.status(200).json({ message: 'Book deleted successfully' });
    }

    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}