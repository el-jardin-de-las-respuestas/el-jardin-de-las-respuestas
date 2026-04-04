import { useState } from "react";
import {
    loginSchema,
    type TLoginFormData,
} from "../../components/schemas/auth";
import axios from "axios";
import { toast } from "sonner";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export function ProfessionalLoginPage() {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setError,
        watch,
        reset,
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    if (!auth) throw new Error("AuthContext no está disponible");
    const onSubmit = async (data: TLoginFormData) => {
        try {
            const res = await axios.post(
                `${API_URL}/auth/login`,
                data
            );
            auth.login(res.data.access_token);
            navigate("/professional-dashboard");
            toast.success("✅ Inicio de sesión exitoso");
        } catch (err: any) {
            const backendErrors = err.response?.data?.errors;
            if (backendErrors) {
                Object.entries(backendErrors).forEach(([field, message]) => {
                    setError(field as keyof typeof data, {
                        type: "server",
                        message: message as string,
                    });
                });
            } else {
                const generalField = "email";
                setError(generalField as keyof typeof data, {
                    type: "server",
                    message: err.response?.data?.message || "Error desconocido",
                });
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-8">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                {/* Header */}
                <div className="p-6 text-center space-y-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex justify-center">
                        <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900 rounded-2xl flex items-center justify-center">
                             <img
                                src="/img/flower-2.svg"
                                alt="El Jardín de las Respuestas"
                                className="h-21 w-auto md:h-9"
                            />
                        </div>
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            El Jardín de las Respuestas
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            Portal Profesional
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                            Iniciar sesión como voluntario
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Mensaje de éxito/error */}
                    {message && (
                        <div
                            className={`mb-4 p-3 rounded-lg ${
                                message.type === "success"
                                    ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800"
                                    : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800"
                            }`}
                        >
                            {message.text}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        {/* Correo Electrónico */}
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Correo Electrónico
                            </label>
                            <input
                                id="email"
                                {...register("email")}
                                type="email"
                                placeholder="tu@email.com"
                                required
                                disabled={isSubmitting}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Contraseña */}
                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Contraseña
                            </label>
                            <input
                                id="password"
                                {...register("password")}
                                type="password"
                                placeholder="••••••••"
                                required
                                disabled={isSubmitting}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                        </div>

                        {/* Link para recuperar contraseña */}
                        <div className="text-right">
                            <button
                                type="button"
                                onClick={() =>
                                    alert("Función próximamente disponible")
                                }
                                className="text-xs text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300 hover:underline"
                                disabled={isSubmitting}
                            >
                                ¿Olvidaste tu contraseña?
                            </button>
                        </div>

                        {/* Botón de login */}
                        <button
                            type="submit"
                            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? "Iniciando sesión..."
                                : "Iniciar Sesión"}
                        </button>
                    </form>

                    {/* Links de navegación */}
                    <div className="mt-6 text-center space-y-3">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            ¿Primera vez aquí?{" "}
                            <button
                                onClick={() =>
                                    navigate("/professional-registration")
                                }
                                className="text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300 font-medium hover:underline"
                                disabled={isSubmitting}
                            >
                                Regístrate como voluntario
                            </button>
                        </p>

                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            ¿Eres estudiante?{" "}
                            <button
                                onClick={() => navigate("/auth")}
                                className="text-pink-600 hover:text-pink-500 dark:text-pink-400 dark:hover:text-pink-300 font-medium hover:underline"
                                disabled={isSubmitting}
                            >
                                Ingresa aquí
                            </button>
                        </p>
                    </div>

                    {/* Modal informativo */}
                    <div className="mt-6 p-6 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-2xl border border-pink-200 dark:border-pink-800">
                        <div className="flex items-start gap-3 mb-3">
                            <span className="text-2xl">💼</span>
                            <h3 className="font-semibold text-lg text-pink-700 dark:text-pink-400">
                                Panel de Profesionales
                            </h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            Accede a tu panel de control para responder
                            consultas, crear contenido educativo, moderar el
                            foro y contribuir a crear un espacio seguro de
                            aprendizaje para adolescentes.
                        </p>
                    </div>

                    {/* Botón para volver */}
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        disabled={isSubmitting}
                        className="w-full mt-4 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        </div>
    );
}
