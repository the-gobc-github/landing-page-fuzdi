'use client';

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Header() {
    const [logoSrc, setLogoSrc] = useState('/logos/ComfyUI_00443__0029_ComfyUI_00213_.png')

    const logoFiles = [
        'ComfyUI_00443__0000_ComfyUI_00459_.png',
        'ComfyUI_00443__0001_ComfyUI_00456_.png',
        'ComfyUI_00443__0002_ComfyUI_00443_.png',
        'ComfyUI_00443__0003_ComfyUI_00430_.png',
        'ComfyUI_00443__0004_ComfyUI_00422_.png',
        'ComfyUI_00443__0005_ComfyUI_00419_.png',
        'ComfyUI_00443__0006_ComfyUI_00416_.png',
        'ComfyUI_00443__0007_ComfyUI_00409_.png',
        'ComfyUI_00443__0008_ComfyUI_00399_.png',
        'ComfyUI_00443__0009_ComfyUI_00384_.png',
        'ComfyUI_00443__0010_ComfyUI_00371_.png',
        'ComfyUI_00443__0011_ComfyUI_00364_.png',
        'ComfyUI_00443__0012_ComfyUI_00363_.png',
        'ComfyUI_00443__0013_ComfyUI_00355_.png',
        'ComfyUI_00443__0014_ComfyUI_00351_.png',
        'ComfyUI_00443__0015_ComfyUI_00335_.png',
        'ComfyUI_00443__0016_ComfyUI_00324_.png',
        'ComfyUI_00443__0017_ComfyUI_00309_.png',
        'ComfyUI_00443__0018_ComfyUI_00303_.png',
        'ComfyUI_00443__0019_ComfyUI_00289_.png',
        'ComfyUI_00443__0020_ComfyUI_00281_.png',
        'ComfyUI_00443__0021_ComfyUI_00269_.png',
        'ComfyUI_00443__0022_ComfyUI_00256_.png',
        'ComfyUI_00443__0023_ComfyUI_00248_.png',
        'ComfyUI_00443__0024_ComfyUI_00245_.png',
        'ComfyUI_00443__0025_ComfyUI_00233_.png',
        'ComfyUI_00443__0026_ComfyUI_00223_.png',
        'ComfyUI_00443__0027_ComfyUI_00218_.png',
        'ComfyUI_00443__0028_ComfyUI_00215_.png',
        'ComfyUI_00443__0029_ComfyUI_00213_.png'
    ]

    useEffect(() => {
        // Select a random logo on component mount
        const randomIndex = Math.floor(Math.random() * logoFiles.length)
        const selectedLogo = `/logos/${logoFiles[randomIndex]}`
        setLogoSrc(selectedLogo)
    }, [])
    return (
        <header className="bg-gradient-to-r from-black via-gray-900 to-purple-900/50 border-b border-gray-800 shadow-lg">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <Image
                                src={logoSrc}
                                alt="Fuzdi Logo"
                                width={124}
                                height={124}
                                className="rounded-lg hover:scale-105 transition-transform duration-200"
                            />
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