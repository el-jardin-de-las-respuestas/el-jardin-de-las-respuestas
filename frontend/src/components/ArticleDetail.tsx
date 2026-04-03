import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";
import axios from "axios";

interface Article {
    id: number;
    title: string;
    description: string;
    content: string;
    createdAt: string;
}

const ArticleDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [article, setArticle] = useState<Article | null>(null);

    const API_URL = import.meta.env.VITE_API_URL;
    async function getLibraryItemById(id: number) {
        const res = await axios.get(`${API_URL}/library/${id}`);
        return res.data;
    }
    useEffect(() => {
        if (id) {
            getLibraryItemById(Number(id))
                .then(setArticle)
                .catch((err) => console.error("Error cargando artículo:", err));
        }
    }, [id]);

    if (!article) {
        return (
            <section className="p-8 pt-32 bg-pink-50 min-h-screen text-center">
                <p className="text-gray-700">Cargando artículo...</p>
            </section>
        );
    }

    return (
        <section className="p-8 pt-32 bg-pink-50 min-h-screen">
            <div className="mb-6">
                <button
                    onClick={() => navigate("/library")}
                    className="text-pink-600 font-semibold underline inline-block"
                >
                    ← Volver a Biblioteca
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow p-6 max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-2xl font-bold text-pink-600">
                        {article.title}
                    </h1>
                    <div className="flex items-center text-gray-500 text-sm">
                        <Clock size={16} className="mr-1" />
                        <span>
                            {new Date(article.createdAt).toLocaleDateString(
                                "es-AR"
                            )}
                        </span>
                    </div>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-6">
                    {article.description}
                </p>

                {/* Contenido completo */}
                <div className="bg-pink-100 p-6 rounded-2xl text-gray-800 leading-relaxed">
                    {(() => {
                        try {
                            const sections = JSON.parse(article.content);
                            if (Array.isArray(sections)) {
                                return sections.map((section: any, idx: number) => (
                                    <div key={idx} className="mb-6">
                                        {section.titulo && (
                                            <h3 className="text-xl font-bold text-pink-700 mb-2">
                                                {section.titulo}
                                            </h3>
                                        )}
                                        {section.texto && (
                                            <p className="mb-4">{section.texto}</p>
                                        )}
                                        {section.contenido && Array.isArray(section.contenido) && (
                                            <div className="space-y-2 mb-4">
                                                {section.contenido.map((text: string, i: number) => (
                                                    <p key={i}>{text}</p>
                                                ))}
                                            </div>
                                        )}
                                        {section.items && Array.isArray(section.items) && (
                                            <ul className={`${section.tipo === 'numerada' ? 'list-decimal' : 'list-disc'} pl-6 space-y-2 mb-4`}>
                                                {section.items.map((item: string, i: number) => (
                                                    <li key={i}>{item}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ));
                            }
                        } catch (e) {
                            // Si no es JSON, mostrar como texto plano
                            return <div className="whitespace-pre-wrap">{article.content}</div>;
                        }
                        return <div className="whitespace-pre-wrap">{article.content}</div>;
                    })()}
                </div>
            </div>
        </section>
    );
};

export default ArticleDetail;
