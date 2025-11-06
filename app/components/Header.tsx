import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
    return (
        <header className="bg-gray-900 border-b border-gray-800 shadow-lg">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <Image
                                src="/logos/ComfyUI_00213_.png"
                                alt="Fuzdi Logo"
                                width={32}
                                height={32}
                                className="rounded-lg"
                            />
                            <span className="text-xl font-bold text-white">
                                Fuzdi
                            </span>
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="#features"
                            className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                        >
                            Fonctionnalités
                        </Link>
                        <Link
                            href="#about"
                            className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                        >
                            À propos
                        </Link>
                        <Link
                            href="#contact"
                            className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                        >
                            Contact
                        </Link>
                        <button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg transition-all duration-200">
                            Commencer
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button className="text-gray-300 hover:text-cyan-400">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    )
}