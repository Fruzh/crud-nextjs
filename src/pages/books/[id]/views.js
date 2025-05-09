import { useRouter } from 'next/router';
import Link from 'next/link';
import { ArrowLeft, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Loader from '@/components/loader';
import { getCategoryStyles } from '@/utils/categoryStyles';

export default function BookDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            setLoading(true);
            fetch(`/api/books/${id}`)
                .then((res) => {
                    if (!res.ok) throw new Error('Book not found');
                    return res.json();
                })
                .then((data) => {
                    setBook(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Failed to fetch book:', error);
                    setError(error.message);
                    setLoading(false);
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

    if (loading) {
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

    if (error) {
        return (
            <>
                <Navbar />
                <div className="max-w-4xl mx-auto px-4 py-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Error</h1>
                    <p className="text-red-600">{error}</p>
                    <button
                        onClick={() => router.push('/books')}
                        className="mt-4 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-200"
                    >
                        Kembali ke Daftar Buku
                    </button>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />            
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-white rounded-2xl shadow-lg p-8 animate-fadeIn">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Placeholder Cover Buku */}
                        <div className="flex-shrink-0">
                            <div className="w-40 h-60 sm:w-48 sm:h-72 bg-gray-200 rounded-lg overflow-hidden shadow-md">
                                {book.bookImage ? (
                                    <img
                                        src={book.bookImage}
                                        alt={`Sampul buku ${book.title}`}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div
                                        className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 font-semibold text-7xl sm:text-9xl"
                                        aria-label={`Inisial sampul buku ${book.title}`}
                                    >
                                        {book.title[0].toUpperCase()}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Detail Buku */}
                        <div className="flex-1 space-y-1">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                                {book.title}
                            </h1>
                            <p className="text-base sm:text-lg text-gray-600 italic mb-3">oleh {book.author}</p>
                            <span
                                className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full ${getCategoryStyles(
                                    book.category
                                )}`}
                            >
                                {book.category || 'Tidak ada kategori'}
                            </span>
                            <div className="prose prose-lg text-gray-700 max-w-none">
                                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
                                    Deskripsi
                                </h3>
                                <p>{book.desc || 'Tidak ada deskripsi tersedia.'}</p>
                                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
                                    Isi Buku
                                </h3>
                                <p>{book.content || 'Tidak ada konten tersedia.'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigasi */}
                    <div className="flex justify-between items-center mt-5">
                        <button
                            onClick={() => router.back()}
                            className="inline-flex items-center gap-2 text-gray-700 bg-gray-100 px-5 py-2.5 rounded-lg hover:bg-gray-200 transition-all duration-200"
                            aria-label="Kembali ke daftar buku"
                        >
                            <ArrowLeft size={20} /> Kembali
                        </button>
                        <Link
                            href={`/books/${book.id}`}
                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-200"
                            aria-label={`Edit buku ${book.title}`}
                        >
                            <Pencil size={20} /> Edit
                        </Link>
                    </div>
                </div>

                <style jsx>{`
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    .animate-fadeIn {
                        animation: fadeIn 0.5s ease-out forwards;
                    }
                `}</style>
            </div>
            <Footer />
        </>
    );
}