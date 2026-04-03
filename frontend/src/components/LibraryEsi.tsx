import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";
import axios from "axios";

interface Article {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

async function getLibraryItems() {
  const res = await axios.get(`${API_URL}/library`);
  return res.data;
}




const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/article/${article.id}`)}
      className="bg-white rounded-2xl shadow hover:shadow-lg cursor-pointer overflow-hidden transition duration-300 flex flex-col"
    >
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-pink-600 mb-2">
          {article.title}
        </h2>
        <p className="text-gray-700 text-sm leading-relaxed flex-grow">
          {article.description}
        </p>
        <div className="flex justify-end items-center mt-4 text-gray-500 text-sm">
          <Clock size={16} className="mr-1" />
          <span>
            {new Date(article.createdAt).toLocaleDateString("es-AR")}
          </span>
        </div>
      </div>
    </div>
  );
};

const LibraryEsi: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    getLibraryItems().then(setArticles).catch(console.error);
  }, []);

  return (
    <section className="pt-32 pb-12 px-8 bg-pink-50 min-h-screen">
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6 text-pink-700">
        Biblioteca ESI
      </h1>
      <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12 text-lg sm:text-xl leading-relaxed">
        Contenido educativo validado por profesionales de la salud.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};

export default LibraryEsi;
