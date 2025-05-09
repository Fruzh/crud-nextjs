import { useState, useEffect } from 'react';
import { Save, Trash2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import Modal from './modal';

export default function BookForm({ onSubmit, initialData = {}, onDelete }) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [desc, setDesc] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [authorError, setAuthorError] = useState(false);
    const [descError, setDescError] = useState(false);
    const [contentError, setContentError] = useState(false);
    const [categoryError, setCategoryError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    // Daftar kategori yang lebih lengkap
    const categories = [
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

    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setTitle(initialData.title || '');
            setAuthor(initialData.author || '');
            setDesc(initialData.desc || '');
            setContent(initialData.content || '');
            setCategory(initialData.category || '');
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset error states
        setTitleError(false);
        setAuthorError(false);
        setDescError(false);
        setContentError(false);
        setCategoryError(false);

        // Validasi field
        let hasError = false;
        if (!title) {
            setTitleError(true);
            window.dispatchEvent(
                new CustomEvent('showNotification', {
                    detail: {
                        message: 'Judul wajib diisi',
                        type: 'error',
                    },
                })
            );
            hasError = true;
        }
        if (!author) {
            setAuthorError(true);
            window.dispatchEvent(
                new CustomEvent('showNotification', {
                    detail: {
                        message: 'Penulis wajib diisi',
                        type: 'error',
                    },
                })
            );
            hasError = true;
        }
        if (!desc) {
            setDescError(true);
            window.dispatchEvent(
                new CustomEvent('showNotification', {
                    detail: {
                        message: 'Deskripsi wajib diisi',
                        type: 'error',
                    },
                })
            );
            hasError = true;
        }
        if (!content) {
            setContentError(true);
            window.dispatchEvent(
                new CustomEvent('showNotification', {
                    detail: {
                        message: 'Isi buku wajib diisi',
                        type: 'error',
                    },
                })
            );
            hasError = true;
        }
        if (!category) {
            setCategoryError(true);
            window.dispatchEvent(
                new CustomEvent('showNotification', {
                    detail: {
                        message: 'Kategori wajib diisi',
                        type: 'error',
                    },
                })
            );
            hasError = true;
        }

        if (hasError) return;

        const bookData = { title, author, desc, content, category };

        try {
            await onSubmit(bookData);
        } catch (error) {
            throw error; // Lempar error ke parent (add.js atau [id].js)
        }
    };

    const handleDelete = async () => {
        if (!initialData.id) return;
        try {
            await onDelete();
        } catch (error) {
            throw error; // Lempar error ke parent
        }
        setIsModalOpen(false);
    };

    return (
        <div className="relative">
            <form onSubmit={handleSubmit} className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-5 mt-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Form Buku</h2>

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="min-w-[460px]">
                        <div className="mb-5">
                            <label className="block text-sm font-medium text-gray-700">Judul Buku</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    setTitleError(false);
                                }}
                                placeholder="Contoh: Laskar Pelangi"
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    titleError ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition-all duration-200 hover:bg-gray-50`}
                            />
                            {titleError && (
                                <p className="mt-1 text-sm text-red-600">Judul wajib diisi</p>
                            )}
                        </div>

                        <div className="mb-5">
                            <label className="block text-sm font-medium text-gray-700">Penulis</label>
                            <input
                                type="text"
                                value={author}
                                onChange={(e) => {
                                    setAuthor(e.target.value);
                                    setAuthorError(false);
                                }}
                                placeholder="Contoh: Andrea Hirata"
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    authorError ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800 transition-all duration-200 hover:bg-gray-50`}
                            />
                            {authorError && (
                                <p className="mt-1 text-sm text-red-600">Penulis wajib diisi</p>
                            )}
                        </div>

                        <div className="mb-5">
                            <label className="block text-sm font-medium text-gray-700">Kategori</label>
                            <div className="relative">
                                <select
                                    value={category}
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                        setCategoryError(false);
                                    }}
                                    className={`mt-1 block w-full px-3 py-2.5 border ${
                                        categoryError ? 'border-red-500' : 'border-gray-300'
                                    } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800 bg-white appearance-none transition-all duration-200 hover:bg-gray-50 focus:bg-gray-50 pr-10`}
                                    aria-invalid={categoryError}
                                >
                                    <option value="">Pilih Kategori</option>
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
                            {categoryError && (
                                <p className="mt-1 text-sm text-red-600">Kategori wajib diisi</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Deskripsi Buku</label>
                            <textarea
                                value={desc}
                                onChange={(e) => {
                                    setDesc(e.target.value);
                                    setDescError(false);
                                }}
                                placeholder="Tuliskan ringkasan buku di sini..."
                                rows={6}
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    descError ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800 resize-none min-h-36 transition-all duration-200 hover:bg-gray-50`}
                            ></textarea>
                            {descError && (
                                <p className="mt-1 text-sm text-red-600">Deskripsi wajib diisi</p>
                            )}
                        </div>
                    </div>

                    <div className="w-full flex-1">
                        <label className="block text-sm font-medium text-gray-700">Isi Buku</label>
                        <textarea
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value);
                                setContentError(false);
                            }}
                            placeholder="Tuliskan isi buku di sini..."
                            rows={6}
                            className={`mt-1 block w-full px-3 py-2 border ${
                                contentError ? 'border-red-500' : 'border-gray-300'
                            } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800 resize-height max-h-128 min-h-[340px] transition-colors duration-200 hover:bg-gray-50`}
                        ></textarea>
                        {contentError && (
                            <p className="mt-1 text-sm text-red-600">Isi buku wajib diisi</p>
                            )}
                    </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 text-gray-700 bg-gray-100 px-5 py-2.5 rounded-lg hover:bg-gray-200 transition-all duration-200"
                    >
                        <ArrowLeft size={20} /> Kembali
                    </button>

                    <div className="flex gap-2">
                        {initialData.id && (
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(true)}
                                className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2.5 rounded-lg hover:bg-red-700 transition-all duration-200"
                            >
                                <Trash2 size={18} /> Hapus
                            </button>
                        )}
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-200"
                        >
                            <Save size={18} /> Simpan
                        </button>
                    </div>
                </div>
            </form>

            {isModalOpen && (
                <Modal
                    title="Konfirmasi Hapus"
                    message="Apakah Anda yakin ingin menghapus buku ini?"
                    onCancel={() => setIsModalOpen(false)}
                    onConfirm={handleDelete}
                />
            )}

            <style jsx>{`
                select {
                    background-image: none; /* Hilangkan panah default */
                }

                select:focus + span svg {
                    transform: rotate(180deg);
                    transition: transform 0.2s ease;
                }

                option {
                    padding: 8px;
                    background: white;
                    color: #1f2937; /* text-gray-800 */
                }

                option:hover {
                    background: #f3f4f6; /* bg-gray-100 */
                }
            `}</style>
        </div>
    );
}