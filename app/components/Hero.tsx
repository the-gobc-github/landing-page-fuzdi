'use client';

import Link from 'next/link'
import ImageCarousel, { ImageCarouselRef } from './ImageCarousel'
import { useState, useEffect, useRef } from 'react'

// Fake prompt demo component
function FakePromptDemo({ onGenerate }: { onGenerate: () => void }) {
    const [currentPrompt, setCurrentPrompt] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [showButton, setShowButton] = useState(false)

    const prompts = [
        "Portrait of a cyberpunk warrior with neon tattoos, digital art style, highly detailed",
        "Majestic dragon soaring through stormy clouds, fantasy concept art, epic lighting",
        "Beautiful anime girl with flowing silver hair, sakura petals, soft pastel colors",
        "Futuristic cityscape at night, neon lights reflecting on wet streets, cyberpunk aesthetic",
        "Mystical forest with glowing mushrooms and fairy lights, enchanted atmosphere",
        "Steampunk airship flying above Victorian London, brass and copper details, vintage",
        "Portrait of an elven mage casting spells, magical energy, fantasy art style",
        "Robotic samurai in ancient temple, blend of technology and tradition, dramatic shadows",
        "Underwater palace with mermaids and coral gardens, bioluminescent creatures",
        "Space station orbiting distant planet, sci-fi concept art, stellar background",
        "Medieval knight in shining armor, castle backdrop, golden hour lighting",
        "Witch's laboratory with potions and spell books, dark gothic atmosphere",
        "Phoenix rising from flames, mythical creature, vibrant fire colors",
        "Crystal cave with prismatic light beams, magical gemstones, ethereal glow",
        "Astronaut explorer on alien world, dual moons in purple sky, surreal landscape"
    ]

    useEffect(() => {
        // Start typing animation after 1 second
        const startTyping = setTimeout(() => {
            typePrompt()
        }, 1000)

        return () => clearTimeout(startTyping)
    }, [])

    const typePrompt = () => {
        const prompt = prompts[Math.floor(Math.random() * prompts.length)]
        let index = 0

        const typeInterval = setInterval(() => {
            setCurrentPrompt(prompt.slice(0, index + 1))
            index++

            if (index >= prompt.length) {
                clearInterval(typeInterval)
                setShowButton(true)
            }
        }, 30)
    }

    const handleGenerate = () => {
        setIsGenerating(true)
        setShowButton(false)

        // Trigger carousel animation immediately on button click
        onGenerate()

        // Show loading for 0.8 seconds (matching carousel scroll duration)
        setTimeout(() => {
            setIsGenerating(false)
            setCurrentPrompt('')
            setShowButton(false)

            // Start new cycle after a pause
            setTimeout(() => {
                typePrompt()
            }, 2000)
        }, 800) // Match faster carousel scroll time
    }

    // Auto-click when button appears
    useEffect(() => {
        if (showButton && !isGenerating) {
            const autoClickTimeout = setTimeout(() => {
                handleGenerate()
            }, 600) // Auto-click after 0.6 seconds for faster synchronization

            return () => clearTimeout(autoClickTimeout)
        }
    }, [showButton, isGenerating])

    return (
        <div className="max-w-2xl mx-auto">
            <div className="relative">
                <input
                    type="text"
                    value={currentPrompt}
                    placeholder="Décrivez l'image que vous voulez créer..."
                    className="w-full bg-transparent text-white placeholder-gray-400 px-6 py-4 pr-16 text-lg border-2 border-gray-600 rounded-full focus:outline-none focus:border-cyan-400 transition-colors duration-150"
                    readOnly
                />
                {showButton && !isGenerating && (
                    <button
                        onClick={handleGenerate}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white p-3 rounded-xl transition-all duration-150 hover:scale-105"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                )}
                {isGenerating && (
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 p-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-cyan-400 border-t-transparent"></div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default function Hero() {
    const carouselRef = useRef<ImageCarouselRef>(null)

    const handleGenerate = () => {
        carouselRef.current?.triggerGeneration()
    }

    return (
        <section className="relative bg-black">
            {/* Gradient overlay - black in center, colored at edges */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-purple-900/10 via-transparent to-cyan-900/10"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 lg:pb-28">
                <div className="text-center">
                    {/* Interactive AI Image Generator */}
                    <div className="mb-8">
                        <div className="flex justify-center mb-6">
                            <ImageCarousel ref={carouselRef} />
                        </div>

                        {/* Fake AI Prompt Demo */}
                        <FakePromptDemo onGenerate={handleGenerate} />
                    </div>


                    {/* Down Arrow CTA */}
                    <div className="flex flex-col items-center mt-12">
                        <p className="text-gray-400 text-sm mb-4">Découvrir</p>
                        <Link
                            href="#features"
                            className="group transition-all duration-200 hover:translate-y-1"
                        >
                            <div className="w-12 h-12 rounded-full border-2 border-gray-600 group-hover:border-cyan-400 flex items-center justify-center transition-colors duration-200">
                                <svg 
                                    className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors duration-200" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </div>
                        </Link>
                    </div>


                </div>
            </div>
        </section>
    )
}