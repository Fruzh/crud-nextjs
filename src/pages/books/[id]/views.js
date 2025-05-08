import { useRouter } from 'next/router';
import Link from 'next/link';
import { ArrowLeft, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Loader from '@/components/loader';

export default function BookDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [book, setBook] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/books/${id}`)
                .then((res) => res.json())
                .then((data) => setBook(data))
                .catch((error) => console.error('Failed to fetch book:', error));
        }
    }, [id]);

    if (!book) {
        return (
            <>
                <Navbar />
                <div className="flex justify-center items-center min-h-screen">
                    <Loader message="Memuat buku..." size="large" color="blue" />
                </div>
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
                            <div className="w-48 h-72 bg-gray-200 rounded-lg overflow-hidden shadow-md">
                                {book.bookImage ? (
                                    <img
                                        src={book.bookImage}
                                        alt={book.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 font-semibold text-9xl">
                                        {book.title[0].toUpperCase()}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Detail Buku */}
                        <div className="flex-1 space-y-6">
                            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
                                {book.title}
                            </h1>
                            <p className="text-lg text-gray-600 italic">oleh {book.author}</p>
                            {book.genre && (
                                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                                    {book.genre || 'New'}dgdfgdf
                                </span>
                            )}
                            <div className="prose prose-lg text-gray-700 max-w-none">
                                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
                                    Deskripsi
                                </h3>
                                <p>{book.desc || 'Tidak ada deskripsi tersedia.'}</p>
                                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
                                    Konten
                                </h3>
                                <p>{book.content || 'Tidak ada konten tersedia.'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigasi */}
                    <div className="flex justify-between items-center mt-10">
                        <button
                            onClick={() => router.back()}
                            className="inline-flex items-center gap-2 text-gray-700 bg-gray-100 px-5 py-2.5 rounded-lg hover:bg-gray-200 transition-all duration-200"
                        >
                            <ArrowLeft size={20} /> Kembali
                        </button>
                        <Link
                            href={`/books/${book.id}`}
                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-200"
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