import { useRouter } from 'next/router';
import { useState } from 'react';
import BookForm from '@/components/bookForm';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Loader from '@/components/loader';

export default function AddBook() {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);

    const addBook = async (book) => {
        try {
            setIsSaving(true);
            const res = await fetch('/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book),
            });
            if (!res.ok) {
                throw new Error('Failed to add book');
            }
            window.dispatchEvent(
                new CustomEvent('showNotification', {
                    detail: {
                        message: 'Buku berhasil ditambahkan',
                        type: 'success',
                    },
                })
            );
            router.push('/books');
        } catch (error) {
            window.dispatchEvent(
                new CustomEvent('showNotification', {
                    detail: {
                        message: 'Gagal menambahkan buku',
                        type: 'error',
                    },
                })
            );
            throw error;
        } finally {
            setIsSaving(false);
        }
    };

    if (isSaving) {
        return (
            <>
                <Navbar />
                <div className="flex justify-center items-center min-h-screen">
                    <Loader message="Menyimpan buku..." size="large" color="green" />
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <BookForm onSubmit={addBook} />
            <Footer />
        </>
    );
}