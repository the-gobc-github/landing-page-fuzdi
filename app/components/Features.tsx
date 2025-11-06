export default function Features() {
    const features = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
            ),
            title: "Serveurs GPU Haute Performance",
            description: "Accédez instantanément à des GPU RTX 4090, A100 et H100 optimisés pour l'IA générative et les workflows ComfyUI."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            title: "Workflows ComfyUI Pré-configurés",
            description: "Lancez vos projets immédiatement avec nos modèles Stable Diffusion, FLUX et autres modèles d'IA pré-installés."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            title: "Dashboard de Gestion Avancé",
            description: "Surveillez vos jobs en temps réel, suivez l'utilisation des ressources et optimisez vos coûts depuis une interface intuitive."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
            ),
            title: "Optimisation des Coûts",
            description: "Payez uniquement ce que vous utilisez avec notre système de facturation à la seconde et l'arrêt automatique des instances."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: "Déploiement Instantané",
            description: "Lancez vos instances GPU en moins de 30 secondes avec nos images Docker optimisées et notre infrastructure cloud."
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: "Sécurité & Isolation",
            description: "Vos données et modèles sont protégés dans des environnements isolés avec chiffrement de bout en bout."
        }
    ];

    return (
        <section id="features" className="py-20 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                        Plateforme GPU Cloud{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                            pour l'IA Générative
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Tout ce dont vous avez besoin pour créer des images avec l'IA.
                        Gérez vos workflows ComfyUI et Stable Diffusion dans le cloud avec une simplicité inégalée.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 border border-gray-700 rounded-xl p-8 hover:bg-gray-750 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105"
                        >
                            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center mb-6">
                                <div className="text-white">
                                    {feature.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">
                                {feature.title}
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center mt-16">
                    <div className="bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 rounded-2xl p-8 md:p-12">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Prêt à créer avec l'IA ?
                        </h3>
                        <p className="text-gray-300 mb-8 text-lg">
                            Rejoignez les créateurs qui utilisent déjà notre plateforme pour générer des milliers d'images avec ComfyUI.
                        </p>
                        <button className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold px-8 py-4 rounded-xl hover:from-cyan-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl">
                            Essayer gratuitement
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}