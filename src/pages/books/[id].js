import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BookForm from '@/components/bookForm';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Loader from '@/components/loader';

export default function EditBook() {
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            fetch(`/api/books/${id}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Book not found');
                    }
                    return res.json();
                })
                .then((data) => setBook(data))
                .catch((err) => {
                    console.error('Failed to fetch book:', err);
                    setError(err.message);
                    window.dispatchEvent(
                        new CustomEvent('showNotification', {
                            detail: {
                                message: 'Gagal memuat buku',
                                type: 'error',
                            },
                        })
                    );
                });
        }
    }, [id]);

    const handleSubmit = async (formData) => {
        console.log('Submitting FormData:', Array.from(formData.entries()));
        try {
            setIsSaving(true);
            const res = await fetch(`/api/books/${id}`, {
                method: 'PUT',
                body: formData,
            });

            console.log('PUT response status:', res.status);
            if (!res.ok) {
                const errorData = await res.json();
                console.error('API error response:', errorData);
                throw new Error(errorData.error || 'Failed to update book');
            }

            window.dispatchEvent(
                new CustomEvent('showNotification', {
                    detail: {
                        message: 'Buku berhasil diubah',
                        type: 'success',
                    },
                })
            );
            router.push('/books');
        } catch (error) {
            console.error('Error updating book:', error);
            window.dispatchEvent(
                new CustomEvent('showNotification', {
                    detail: {
                        message: error.message,
                        type: 'error',
                    },
                })
            );
            throw error;
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            const res = await fetch(`/api/books/${id}`, {
                method: 'DELETE',
            });

            console.log('DELETE response status:', res.status);
            if (!res.ok) {
                const errorData = await res.json();
                console.error('API error response:', errorData);
                throw new Error(errorData.error || 'Failed to delete book');
            }

            window.dispatchEvent(
                new CustomEvent('showNotification', {
                    detail: {
                        message: 'Buku berhasil dihapus',
                        type: 'success',
                    },
                })
            );
            router.push('/books');
        } catch (error) {
            console.error('Error deleting book:', error);
            window.dispatchEvent(
                new CustomEvent('showNotification', {
                    detail: {
                        message: error.message,
                        type: 'error',
                    },
                })
            );
            throw error;
        } finally {
            setIsDeleting(false);
        }
    };

    if (error) {
        return (
            <>
                <Navbar />
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-gray-800">Error</h1>
                    <p className="text-red-600">{error}</p>
                    <button
                        onClick={() => router.push('/books')}
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Kembali ke Daftar Buku
                    </button>
                </div>
                <Footer />
            </>
        );
    }

    if (!book) {
        return (
            <>
                <Navbar />
                <div className="flex justify-center items-center min-h-screen">
                    <Loader message="Memuat buku..." size="large" color="blue" />
                </div>
                <Footer />
            </>
        );
    }

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

    if (isDeleting) {
        return (
            <>
                <Navbar />
                <div className="flex justify-center items-center min-h-screen">
                    <Loader message="Menghapus buku..." size="large" color="red" />
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-10 min-h-[80vh]">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Edit Buku</h1>
                <BookForm
                    initialData={book}
                    onSubmit={handleSubmit}
                    onDelete={handleDelete}
                />
            </div>
            <Footer />
        </>
    );
}