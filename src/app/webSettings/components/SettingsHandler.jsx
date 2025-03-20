'use client';

import { SettingsContext } from "@/context/SettingsContext";
import { useContext, useState } from "react";
import {
    Button,
    Card,
    CardBody,
    Typography,
} from '@/components/ui';
import { ChevronDown } from "lucide-react"; // ✅ Ícono adecuado para el botón


export function SettingsHandler() {
    const {
        formData,
        appliedStyles,
        handleChange,
        handleSubmit,
    } = useContext(SettingsContext);

    const [isOpen, setIsOpen] = useState(false); // ✅ Estado para manejar el accordion

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 py-10">
            <Typography variant="h4" className="mb-4 font-semibold text-gray-800 text-center">
                🎨 Font & Display Settings
            </Typography>

            <Card className="max-w-lg w-full shadow-lg bg-white rounded-lg p-6">
                <CardBody>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <label className="font-medium text-gray-700"><strong>Font Size </strong></label>
                        <input 
                            type="text" 
                            name="fontSize" 
                            value={formData.fontSize} 
                            onChange={handleChange}
                            placeholder="Ejemplo: 20px, 1.2rem"
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <label className="font-medium text-gray-700"><strong>Display </strong></label>
                        <input 
                            type="text" 
                            name="display" 
                            value={formData.display} 
                            onChange={handleChange}
                            placeholder="Ejemplo: block, flex, none"
                            className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <Button type="submit" variant="filled" color="blue" className="mt-2">
                            Aplicar Configuración
                        </Button>
                    </form>
                </CardBody>
            </Card>

            <div className="max-w-2xl mx-auto p-6 mt-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
                    🚀 Viaje al Espacio: La Nueva Frontera
                </h1>

                {/* ✅ Accordion bien alineado y con diseño mejorado */}
                <div className="border border-gray-300 rounded-lg w-full">
                    {/* ✅ Header con ícono de tamaño normal y alineado */}
                    <button 
                        onClick={() => setIsOpen(!isOpen)} 
                        className="flex justify-between items-center w-full px-4 py-3 bg-gray-100 rounded-t-lg cursor-pointer hover:bg-gray-200 transition"
                    >
                        <span className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            🌍 Historia de la Exploración Espacial
                        </span>
                        <ChevronDown className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""} h-5 w-5`} />
                    </button>

                    {/* ✅ Mostrar/ocultar contenido con una transición fluida */}
                    <div 
                        className={`overflow-hidden transition-all duration-300 ${
                            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                        
                    >
                        <div className="px-4 py-3 text-gray-700 leading-relaxed" style={{
                            fontSize: appliedStyles.fontSize,
                            display: appliedStyles.display || "block",
                        }}>
                            La exploración espacial comenzó en 1957 con el lanzamiento del 
                            <strong> Sputnik 1</strong>, el primer satélite artificial enviado 
                            por la Unión Soviética. Luego, en 1961, <strong>Yuri Gagarin</strong> 
                            se convirtió en el primer ser humano en viajar al espacio a bordo del 
                            <em> Vostok 1</em>.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
