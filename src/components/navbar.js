import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
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
                        className="text-gray-600 hover:text-blue-600 font-medium transition duration-200"
                    >
                        Beranda
                    </Link>
                    <Link
                        href="/about"
                        className="text-gray-600 hover:text-blue-600 font-medium transition duration-200"
                    >
                        Tentang Kami
                    </Link>
                    <Link
                        href="/books"
                        className="text-gray-600 hover:text-blue-600 font-medium transition duration-200"
                    >
                        Daftar Buku
                    </Link>
                    <Link
                        href="/books/add"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Tambah Buku
                    </Link>
                </nav>

                <button
                    className="md:hidden text-gray-600 hover:text-blue-600"
                    onClick={toggleMenu}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {isOpen && (
                <nav className="md:hidden bg-white shadow-md">
                    <div className="px-6 py-4 flex flex-col gap-4">
                        <Link
                            href="/"
                            className="text-gray-600 hover:text-blue-600 font-medium"
                            onClick={toggleMenu}
                        >
                            Beranda
                        </Link>
                        <Link
                            href="/books"
                            className="text-gray-600 hover:text-blue-600 font-medium"
                            onClick={toggleMenu}
                        >
                            Daftar Buku
                        </Link>
                        <Link
                            href="/books/add"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700"
                            onClick={toggleMenu}
                        >
                            Tambah Buku
                        </Link>
                    </div>
                </nav>
            )}
        </header>
    );
}