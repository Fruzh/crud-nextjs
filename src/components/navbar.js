import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Fungsi untuk menentukan apakah tautan aktif
    const isActive = (href) => {
        if (href === '/') {
            return router.pathname === '/';
        }
        return router.pathname === href || router.pathname.startsWith(href + '/');
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50 transition-shadow duration-300">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-blue-600">
                    SESPlus
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    <Link
                        href="/"
                        className={`font-medium transition duration-200 ${
                            isActive('/') ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'
                        }`}
                        aria-current={isActive('/') ? 'page' : undefined}
                    >
                        Beranda
                    </Link>
                    <Link
                        href="/about"
                        className={`font-medium transition duration-200 ${
                            isActive('/about') ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'
                        }`}
                        aria-current={isActive('/about') ? 'page' : undefined}
                    >
                        Tentang Kami
                    </Link>
                    <Link
                        href="/books"
                        className={`font-medium transition duration-200 ${
                            isActive('/books') ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'
                        }`}
                        aria-current={isActive('/books') ? 'page' : undefined}
                    >
                        Daftar Buku
                    </Link>
                    <Link
                        href="/books/add"
                        className={`font-medium px-4 py-2 rounded-lg transition duration-200 ${
                            isActive('/books/add')
                                ? 'bg-blue-700 text-white'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                        aria-current={isActive('/books/add') ? 'page' : undefined}
                    >
                        Tambah Buku
                    </Link>
                </nav>

                <button
                    className="md:hidden text-gray-600 hover:text-blue-600"
                    onClick={toggleMenu}
                    aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {isOpen && (
                <nav className="md:hidden bg-white shadow-md">
                    <div className="px-6 py-4 flex flex-col gap-4">
                        <Link
                            href="/"
                            className={`font-medium ${
                                isActive('/') ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'
                            }`}
                            onClick={toggleMenu}
                            aria-current={isActive('/') ? 'page' : undefined}
                        >
                            Beranda
                        </Link>
                        <Link
                            href="/about"
                            className={`font-medium ${
                                isActive('/about') ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'
                            }`}
                            onClick={toggleMenu}
                            aria-current={isActive('/about') ? 'page' : undefined}
                        >
                            Tentang Kami
                        </Link>
                        <Link
                            href="/books"
                            className={`font-medium ${
                                isActive('/books') ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'
                            }`}
                            onClick={toggleMenu}
                            aria-current={isActive('/books') ? 'page' : undefined}
                        >
                            Daftar Buku
                        </Link>
                        <Link
                            href="/books/add"
                            className={`font-medium px-4 py-2 rounded-lg text-center ${
                                isActive('/books/add')
                                    ? 'bg-blue-700 text-white'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                            onClick={toggleMenu}
                            aria-current={isActive('/books/add') ? 'page' : undefined}
                        >
                            Tambah Buku
                        </Link>
                    </div>
                </nav>
            )}
        </header>
    );
}