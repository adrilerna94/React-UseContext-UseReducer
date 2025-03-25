'use client';

import  { createContext, useState } from 'react';

// 1 Creamos el contexto
export const SettingsContext = createContext();

// 2 Proveedor del contexto

export const SettingsProvider = ({ children }) => {
    // useState para manejar los datos del formulario de Settings
    const [ formData, setFormData ] = useState({
        fontSize: "",
        display: "",
    });
    
    // Etado que aplicará los cambios visualmente
    const [appliedStyles, setAppliedStyles] = useState({
        fontSize: '1em', // default
        display: 'block', // default
    });

    // manejar cambios en los inputs en tiempo real
    const handleChange = (e) => {
        /*
          📌 e.target (event.target) ➡️ objeto que dispara el evento (input)
            ➡️ e.target.name ➡️ <input name= "fontSize">
            ➡️ e.target.value ➡️ <input value= "1.2rem">
        */
        const { name, value } = e.target;
        // actualizamos solo la propiedad (name) que cambia
        // y dejamos el resto de datos intactos
        // fontSize o display en este caso
        setFormData({
            ...formData, // Copia el estado anterior
            [name] : value // fontSize : "1.em" Solo actualiza "fontSize"
        });
    };

    // Manejar el envío del formulario (después click submit)
    const handleSubmit = (e) => {
        e.preventDefault();

        // ✅ Obtener valores directamente de formData
        const { fontSize , display } = formData;

        // ✅ Validar que los valores no estén vacíos
        if (fontSize.trim() || display.trim()) {
            setAppliedStyles({
                fontSize: formData.fontSize || '1em', // valor default si input vacío
                display: formData.display || 'block', // default
            });
        }
        // limpiar datos del formulario
        setFormData({
            fontSize: "",
            display: ''
        });
    }

    return (
        <SettingsContext.Provider value = {{ 
            formData,
            appliedStyles,
            handleChange,
            handleSubmit,
        }}>
            {children}
        </SettingsContext.Provider>

    )

}