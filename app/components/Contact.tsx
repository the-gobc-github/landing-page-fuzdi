'use client';

import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
        // Reset form
        setFormData({ name: '', email: '', company: '', message: '' });
        // You can add actual form submission logic here
    };

    return (
        <section id="contact" className="py-20 bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Side - Contact Info */}
                    <div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                            Créons ensemble{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                                vos projets IA
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            Prêt à révolutionner votre création d'images avec l'IA ? Contactez notre équipe
                            et découvrez comment notre plateforme GPU peut accélérer vos workflows ComfyUI.
                        </p>

                        {/* Contact Details */}
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Email</h3>
                                    <p className="text-gray-300">contact@fuzdi.com</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Support Discord</h3>
                                    <p className="text-gray-300">discord.gg/fuzdi</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Support 24/7</h3>
                                    <p className="text-gray-300">Assistance en temps réel</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Contact Form */}
                    <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-xl p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                    Nom complet
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
                                    placeholder="Votre nom complet"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    Adresse email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
                                    placeholder="votre.email@exemple.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                                    Type de projet IA
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-gray-800 text-white placeholder-gray-400"
                                    placeholder="Art génératif, e-commerce, marketing..."
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                    Décrivez votre projet
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-gray-800 text-white placeholder-gray-400 resize-none"
                                    placeholder="Parlez-nous de vos besoins en génération d'images IA..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold py-4 rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                Envoyer le message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}