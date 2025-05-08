import { useEffect, useState, useRef } from 'react';
import { BookText, Pencil, Trash, Plus } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Loader from '@/components/loader';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Modal from '@/components/modal';

export default function Booklist() {
    const [books, setBooks] = useState([]);
    const [visible, setVisible] = useState(8);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookIdToDelete, setBookIdToDelete] = useState(null);
    const { ref, inView } = useInView({ threshold: 1 });
    const cardRefs = useRef([]);

    useEffect(() => {
        fetch('/api/books')
            .then((res) => res.json())
            .then((data) => setBooks(data))
            .catch((error) => console.error('Failed to fetch books:', error));
    }, []);

    useEffect(() => {
        if (inView && visible < books.length) {
            setTimeout(() => {
                setVisible((prev) => prev + 8);
            }, 500);
        }
    }, [inView]);

    useEffect(() => {
        const updateCardHeights = () => {
            const heights = cardRefs.current.map((ref) => ref?.getBoundingClientRect().height || 0);
            const maxHeight = Math.max(...heights);
            cardRefs.current.forEach((ref) => {
                if (ref) ref.style.minHeight = `${maxHeight}px`;
            });
            console.log('Card heights updated:', heights, 'Max height:', maxHeight);
        };

        updateCardHeights();
        window.addEventListener('resize', updateCardHeights);
        return () => window.removeEventListener('resize', updateCardHeights);
    }, [books, visible]);

    const deleteBook = async (id) => {
        try {
            await fetch(`/api/books/${id}`, { method: 'DELETE' });
            setBooks(books.filter((b) => b.id !== id));
            window.dispatchEvent(
                new CustomEvent('showNotification', {
                    detail: {
                        message: 'Buku berhasil dihapus',
                        type: 'success',
                    },
                })
            );
        } catch (error) {
            window.dispatchEvent(
                new CustomEvent('showNotification', {
                    detail: {
                        message: 'Gagal menghapus buku',
                        type: 'error',
                    },
                })
            );
        }
    };

    const handleDeleteClick = (id) => {
        setBookIdToDelete(id);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (bookIdToDelete) {
            await deleteBook(bookIdToDelete);
            setIsModalOpen(false);
            setBookIdToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setIsModalOpen(false);
        setBookIdToDelete(null);
    };

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900">Koleksi Buku</h1>
                    <Link
                        href="/books/add"
                        className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 inline-flex items-center gap-2 transition-all duration-200"
                        onClick={() => console.log('Navigating to /books/add')}
                    >
                        <Plus size={20} /> Tambah Buku
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {books.slice(0, visible).map((b, i) => (
                        <Link
                            key={b.id}
                            href={`/books/${b.id}/views`}
                            onClick={() => console.log('Card clicked, navigating to:', `/books/${b.id}/views`)}
                        >
                            <div
                                ref={(el) => (cardRefs.current[i] = el)}
                                className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 flex flex-col text-center items-center cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:scale-102 animate-fadeIn"
                                style={{
                                    animationDelay: `${i * 100}ms`,
                                    animationFillMode: 'both',
                                }}
                            >
                                <div className="absolute top-4 right-4">
                                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                        New
                                    </span>
                                </div>
                                <BookText size={64} className="text-blue-600 my-4" />
                                <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                                    {b.title}
                                </h2>
                                <p className="text-sm text-gray-600 mb-4 line-clamp-1">
                                    oleh {b.author}
                                </p>
                                <div className="flex gap-3 mt-auto">
                                    <Link
                                        href={`/books/${b.id}`}
                                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-md text-sm flex items-center gap-1 transition-colors duration-200"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            console.log('Edit clicked, navigating to:', `/books/${b.id}`);
                                        }}
                                    >
                                        <Pencil size={18} /> Edit
                                    </Link>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleDeleteClick(b.id);
                                            console.log('Delete clicked for book:', b.id);
                                        }}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-1 transition-colors duration-200"
                                    >
                                        <Trash size={18} /> Delete
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {visible < books.length && (
                    <div ref={ref} className="mt-10">
                        <Loader message="Memuat lebih banyak buku..." size="medium" color="blue" />
                    </div>
                )}

                {isModalOpen && (
                    <Modal
                        title="Konfirmasi Hapus"
                        message="Apakah Anda yakin ingin menghapus buku ini?"
                        onConfirm={handleConfirmDelete}
                        onCancel={handleCancelDelete}
                    />
                )}

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

                    .line-clamp-1 {
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }

                    .line-clamp-2 {
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                `}</style>
            </div>

            <Footer />
        </>
    );
}