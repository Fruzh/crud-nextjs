import { useEffect, useState, useRef, useMemo } from 'react';
import { BookText, Pencil, Trash, Plus, Search } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Loader from '@/components/loader';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Modal from '@/components/modal';
import { getCategoryStyles } from '@/utils/categoryStyles';

function levenshteinDistance(a, b) {
    const matrix = Array(b.length + 1)
        .fill(null)
        .map(() => Array(a.length + 1).fill(null));

    for (let i = 0; i <= a.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= b.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= b.length; j++) {
        for (let i = 1; i <= a.length; i++) {
            const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
            matrix[j][i] = Math.min(
                matrix[j][i - 1] + 1,
                matrix[j - 1][i] + 1,
                matrix[j - 1][i - 1] + indicator
            );
        }
    }

    return matrix[b.length][a.length];
}

export default function BookList() {
    const [books, setBooks] = useState([]);
    const [visible, setVisible] = useState(8);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookIdToDelete, setBookIdToDelete] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('Semua Kategori');
    const [searchQuery, setSearchQuery] = useState('');
    const { ref: loaderRef, inView: loaderInView } = useInView({ threshold: 1 });
    const cardRefs = useRef([]);

    const categories = [
        'Semua Kategori',
        'Fiksi',
        'Non-Fiksi',
        'Fantasi',
        'Misteri',
        'Romansa',
        'Sains',
        'Sejarah',
        'Biografi',
        'Teknologi',
        'Bisnis',
        'Filsafat',
        'Psikologi',
        'Anak-Anak',
        'Petualangan',
        'Horor'
    ];

    const filteredBooks = useMemo(() => {
        let result = books;
        if (selectedCategory !== 'Semua Kategori') {
            result = result.filter((b) => b.category === selectedCategory);
        }
        if (searchQuery) {
            const queryWords = searchQuery.toLowerCase().split(/\s+/).filter(word => word.length >= 3);
            if (queryWords.length > 0) {
                result = result.filter((b) => {
                    const titleWords = (b.title || '').toLowerCase().split(/\s+/);
                    const authorWords = (b.author || '').toLowerCase().split(/\s+/);

                    return queryWords.every((queryWord) =>
                        titleWords.some((titleWord) => levenshteinDistance(queryWord, titleWord) <= 2) ||
                        authorWords.some((authorWord) => levenshteinDistance(queryWord, authorWord) <= 2)
                    );
                });
            }
        }
        return result;
    }, [books, selectedCategory, searchQuery]);

    useEffect(() => {
        fetch('/api/books')
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch books');
                return res.json();
            })
            .then((data) => {
                setBooks(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Failed to fetch books:', error);
                setError('Gagal memuat buku');
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
    }, []);

    useEffect(() => {
        if (loaderInView && visible < filteredBooks.length) {
            setVisible((prev) => Math.min(prev + 8, filteredBooks.length));
        }
    }, [loaderInView, filteredBooks.length]);

    useEffect(() => {
        const updateCardHeights = () => {
            const heights = cardRefs.current
                .filter((ref) => ref)
                .map((ref) => ref.getBoundingClientRect().height || 0);
            const maxHeight = Math.max(...heights, 200);
            cardRefs.current.forEach((ref) => {
                if (ref) ref.style.minHeight = `${maxHeight}px`;
            });
        };

        if (filteredBooks.length > 0) {
            updateCardHeights();
            window.addEventListener('resize', updateCardHeights);
            return () => window.removeEventListener('resize', updateCardHeights);
        }
    }, [filteredBooks, visible]);

    const deleteBook = async (id) => {
        try {
            const res = await fetch(`/api/books/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete book');
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
            throw error;
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

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setVisible(8);
    };

    if (error) {
        return (
            <>
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 py-10">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Koleksi Buku</h1>
                    <p className="text-red-600">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Coba Lagi
                    </button>
                </div>
                <Footer />
            </>
        );
    }

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

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-10 min-h-[80vh]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900">Koleksi Buku</h1>
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <div className="relative w-full sm:w-64">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Cari judul atau penulis..."
                                className="block w-full px-3 py-2.5 pl-10 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800 bg-white transition-all duration-200 hover:bg-gray-50 focus:bg-gray-50"
                                aria-label="Cari buku berdasarkan judul atau penulis"
                            />
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <Search size={20} className="text-gray-500" />
                            </span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative w-full sm:w-48">
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => {
                                        setSelectedCategory(e.target.value);
                                        setVisible(8);
                                    }}
                                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800 bg-white appearance-none transition-all duration-200 hover:bg-gray-50 focus:bg-gray-50 pr-10"
                                    aria-label="Filter buku berdasarkan kategori"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-gray-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <Link
                                href="/books/add"
                                className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 inline-flex items-center gap-2 transition-all duration-200"
                                aria-label="Tambah buku baru"
                            >
                                <Plus size={20} /> Tambah Buku
                            </Link>
                        </div>
                    </div>
                </div>

                {filteredBooks.length === 0 ? (
                    <p className="text-center text-gray-500 text-lg min-h-screen flex items-center justify-center">
                        Tidak ada buku tersedia untuk kriteria ini.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredBooks.slice(0, visible).map((b, i) => {
                            const batchIndex = i % 16;
                            const delay = batchIndex * 100;

                            return (
                                <Link
                                    key={b.id}
                                    href={`/books/${b.id}/views`}
                                    aria-label={`Lihat detail buku ${b.title}`}
                                >
                                    <div
                                        ref={(el) => (cardRefs.current[i] = el)}
                                        className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 flex flex-col text-center items-center cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:scale-102 animate-fadeIn min-w-[200px]"
                                        style={{
                                            animationDelay: `${delay}ms`,
                                            animationFillMode: 'both',
                                        }}
                                    >
                                        <div className="absolute top-4 right-4">
                                            <span
                                                className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getCategoryStyles(
                                                    b.category
                                                )}`}
                                            >
                                                {b.category || 'Tidak ada kategori'}
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
                                                onClick={(e) => e.stopPropagation()}
                                                aria-label={`Edit buku ${b.title}`}
                                            >
                                                <Pencil size={18} /> Edit
                                            </Link>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleDeleteClick(b.id);
                                                }}
                                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-1 transition-colors duration-200"
                                                aria-label={`Hapus buku ${b.title}`}
                                            >
                                                <Trash size={18} /> Delete
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}

                {visible < filteredBooks.length && (
                    <div ref={loaderRef} className="mt-10">
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

                    select {
                        background-image: none;
                    }

                    select:focus + span svg {
                        transform: rotate(180deg);
                        transition: transform 0.2s ease;
                    }

                    option {
                        padding: 8px;
                        background: white;
                        color: #1f2937;
                    }

                    option:hover {
                        background: #f3f4f6;
                    }
                `}</style>
            </div>
            <Footer />
        </>
    );
}