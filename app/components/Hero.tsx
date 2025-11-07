'use client';

import Link from 'next/link'
import ImageCarousel, { ImageCarouselRef } from './ImageCarousel'
import { useState, useEffect, useRef, Fragment } from 'react'

// Fake prompt demo component
type WorkflowStage = 'idle' | 'queue' | 'encode' | 'render' | 'done'

function ComfyWorkflow({ stage }: { stage: WorkflowStage }) {
    const stageOrder: WorkflowStage[] = ['queue', 'encode', 'render', 'done']
    const activeIndex = stageOrder.indexOf(stage)

    const nodes = [
        {
            id: 'conditioning',
            label: 'Conditioning',
            title: 'Model Loader',
            badge: 'Checkpoint'
        },
        {
            id: 'sampler',
            label: 'KSampler',
            title: 'Sampler Loop',
            badge: 'CFG 7.0'
        }
    ]

    const statusText: Record<WorkflowStage, string> = {
        idle: 'Idle',
        queue: 'Queueing nodes...',
        encode: 'Encoding prompt...',
        render: 'Rendering latent...',
        done: 'Baking preview...'
    }

    const getNodeState = (index: number) => {
        if (stage === 'idle') return 'idle'
        if (activeIndex === -1) return 'pending'

        // Invert the logic: start from right (index 1) to left (index 0)
        const reversedIndex = nodes.length - 1 - index
        if (reversedIndex < activeIndex) return 'complete'
        if (reversedIndex === activeIndex) return 'active'
        if (stage === 'done') return 'complete'
        return 'pending'
    }

    return (
        <div className="relative w-full">
            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm gap-2 sm:gap-0 mb-4 sm:mb-6">
                <div className="uppercase tracking-[0.25rem] sm:tracking-[0.35rem] text-cyan-200/70">Node Graph</div>
                <div className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-2 py-1 sm:px-3 text-cyan-100 text-center">{statusText[stage]}</div>
            </div>

            <div className="relative flex flex-col sm:flex-row items-center gap-3 sm:gap-4 lg:gap-6">
                {nodes.map((node, index) => {
                    const nodeState = getNodeState(index)
                    const isComplete = nodeState === 'complete'
                    const isActive = nodeState === 'active'

                    const nodeClass = [
                        'relative flex min-h-[100px] sm:min-h-[120px] flex-1 flex-col justify-between rounded-lg border px-3 py-3 sm:px-4 sm:py-4 transition-colors duration-200',
                        nodeState === 'idle' && 'border-gray-800 bg-gray-900/60 text-gray-300',
                        nodeState === 'pending' && 'border-gray-800 bg-gray-900/80 text-gray-500',
                        isActive && 'border-cyan-400 bg-black text-cyan-50 shadow-[0_0_20px_rgba(6,182,212,0.3)]',
                        isComplete && 'border-cyan-500/60 bg-cyan-500/10 text-cyan-100'
                    ]
                        .filter(Boolean)
                        .join(' ')

                    const connectorClass = [
                        'flex h-1 w-8 lg:w-12 items-center rounded-full transition-colors duration-200',
                        // For inverted animation: check if the right node (index+1) is complete or active
                        getNodeState(index + 1) === 'complete' || getNodeState(index + 1) === 'active' ? 'bg-gradient-to-r from-cyan-500/80 to-purple-400/80' : 'bg-gray-800'
                    ].join(' ')

                    return (
                        <Fragment key={node.id}>
                            <div className={nodeClass}>
                                <div>
                                    <div className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.35em] text-cyan-200/70">{node.label}</div>
                                    <div className="mt-2 text-sm sm:text-base font-semibold">{node.title}</div>
                                </div>
                                <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-400">
                                    {/* Input connection points (left side) */}
                                    <div className="flex items-center gap-1 sm:gap-2 relative -ml-2">
                                        <span className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full ${isComplete || isActive ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]' : 'bg-gray-600'} border-2 border-black`}></span>
                                        <span className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full ${isComplete || isActive ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]' : 'bg-gray-600'} border-2 border-black`}></span>
                                    </div>
                                    <div className="rounded border border-cyan-500/30 bg-cyan-500/10 px-1.5 py-0.5 sm:px-2 sm:py-1 text-[9px] sm:text-[11px] uppercase tracking-wide text-cyan-100">
                                        {node.badge}
                                    </div>
                                    {/* Output connection points (right side) */}
                                    <div className="flex items-center gap-1 sm:gap-2 relative -mr-2">
                                        <span className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full ${isComplete || isActive ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]' : 'bg-gray-600'} border-2 border-black`}></span>
                                        <span className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full ${isComplete ? 'bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.6)]' : 'bg-gray-600'} border-2 border-black`}></span>
                                    </div>
                                </div>
                            </div>
                            {index < nodes.length - 1 && (
                                <div className="relative flex items-center justify-center w-16 lg:w-20 h-12">
                                    <svg
                                        viewBox="0 0 80 48"
                                        className="absolute inset-0 w-full h-full"
                                        preserveAspectRatio="none"
                                    >
                                        <defs>
                                            <linearGradient id={`nodeConnector${index}`} x1="0%" y1="50%" x2="100%" y2="50%">
                                                <stop offset="0%" stopColor={isComplete || isActive ? 'rgb(34,211,238)' : 'rgb(75,85,99)'} stopOpacity="0.8" />
                                                <stop offset="100%" stopColor={isComplete ? 'rgb(192,132,252)' : isActive ? 'rgb(34,211,238)' : 'rgb(75,85,99)'} stopOpacity="0.8" />
                                            </linearGradient>
                                        </defs>
                                        <path
                                            d="M 8 24 C 32 24 48 24 72 24"
                                            fill="none"
                                            stroke={getNodeState(index + 1) === 'complete' || getNodeState(index + 1) === 'active' ? 'rgb(34,211,238)' : 'rgb(75,85,99)'}
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                        />
                                        {/* Input connection point */}
                                        <circle
                                            cx="8"
                                            cy="24"
                                            r="4"
                                            fill={getNodeState(index + 1) === 'complete' || getNodeState(index + 1) === 'active' ? 'rgba(34,211,238,0.3)' : 'rgba(75,85,99,0.3)'}
                                            stroke={getNodeState(index + 1) === 'complete' || getNodeState(index + 1) === 'active' ? 'rgb(34,211,238)' : 'rgb(75,85,99)'}
                                            strokeWidth="2"
                                        />
                                        {/* Output connection point */}
                                        <circle
                                            cx="72"
                                            cy="24"
                                            r="4"
                                            fill={getNodeState(index + 1) === 'complete' ? 'rgba(192,132,252,0.3)' : getNodeState(index + 1) === 'active' ? 'rgba(34,211,238,0.3)' : 'rgba(75,85,99,0.3)'}
                                            stroke={getNodeState(index + 1) === 'complete' ? 'rgb(192,132,252)' : getNodeState(index + 1) === 'active' ? 'rgb(34,211,238)' : 'rgb(75,85,99)'}
                                            strokeWidth="2"
                                        />
                                    </svg>
                                </div>
                            )}
                        </Fragment>
                    )
                })}
            </div>
        </div>
    )
}

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
    const workflowTimers = useRef<ReturnType<typeof setTimeout>[]>([])
    const [workflowStage, setWorkflowStage] = useState<WorkflowStage>('idle')

    const handleGenerate = () => {
        workflowTimers.current.forEach(clearTimeout)
        workflowTimers.current = []

        setWorkflowStage('queue')
        carouselRef.current?.triggerGeneration()

        const sequence: Array<{ stage: WorkflowStage; delay: number }> = [
            { stage: 'encode', delay: 220 },
            { stage: 'render', delay: 520 },
            { stage: 'done', delay: 880 },
            { stage: 'idle', delay: 1600 }
        ]

        sequence.forEach(({ stage, delay }) => {
            const timeout = setTimeout(() => {
                setWorkflowStage(stage)
            }, delay)
            workflowTimers.current.push(timeout)
        })
    }

    useEffect(() => {
        return () => {
            workflowTimers.current.forEach(clearTimeout)
        }
    }, [])

    return (
        <section className="relative bg-black">


            {/* Gradient overlay - black in center, colored at edges */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-purple-900/10 via-transparent to-cyan-900/10"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 lg:pb-28">
                <div className="text-center">
                    {/* Interactive AI Image Generator */}
                    <div className="mb-12">
                        <div className="relative mx-auto flex max-w-5xl flex-col items-center">
                            {/* Image Carousel */}
                            <div className="relative z-20 w-full max-w-3xl mb-8">
                                <ImageCarousel ref={carouselRef} />
                            </div>

                            {/* Node Workflow */}
                            <div className="relative z-20 w-full max-w-3xl px-2 sm:px-4 mb-8">
                                <div
                                    className={`transition-all duration-300 ease-out ${workflowStage === 'idle' ? 'opacity-95' : 'opacity-100'
                                        }`}
                                >
                                    <ComfyWorkflow stage={workflowStage} />
                                </div>
                            </div>

                            {/* Input Field */}
                            <div className="relative z-20 w-full max-w-2xl px-4 sm:px-0">
                                <FakePromptDemo onGenerate={handleGenerate} />
                            </div>

                            {/* Connection from input to nodes */}

                            <div className="absolute inset-0 pointer-events-none z-10">
                                <svg
                                    className="absolute inset-0 w-full h-full"
                                    preserveAspectRatio="xMidYMid meet"
                                    viewBox="0 0 800 600"
                                >
                                    <path
                                        d="M 700 570 Q 800 520 730 460"
                                        fill="none"
                                        stroke="rgb(34,211,238)"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeOpacity="0.8"
                                        strokeDasharray={workflowStage === 'queue' ? "5 5" : "none"}
                                    />
                                    <circle cx="700" cy="570" r="3" fill="rgb(34,211,238)" fillOpacity="0.9" />
                                    <circle cx="730" cy="460" r="3" fill="rgb(34,211,238)" fillOpacity="0.9" />
                                </svg>
                            </div>

                            <div className="absolute inset-0 pointer-events-none z-10">
                                <svg
                                    className="absolute inset-0 w-full h-full"
                                    preserveAspectRatio="xMidYMid meet"
                                    viewBox="0 0 800 600"
                                >
                                    <path
                                        d="M 70 460 Q -40 200 160 160"
                                        fill="none"
                                        stroke="rgb(34,211,238)"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeOpacity="0.8"
                                        strokeDasharray={workflowStage === 'queue' ? "5 5" : "none"}
                                    />
                                    <circle cx="70" cy="460" r="3" fill="rgb(34,211,238)" fillOpacity="0.9" />
                                    <circle cx="160" cy="160" r="3" fill="rgb(34,211,238)" fillOpacity="0.9" />
                                </svg>
                            </div>


                        </div>
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