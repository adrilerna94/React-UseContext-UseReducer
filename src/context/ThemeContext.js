// 'use client';

// import { createContext, useState } from "react";

// // Crear el context
// export const ThemeContext = createContext();

// // Proveedor del contexto
// export const ThemeProvider = ({ children }) => {
//     const [theme, setTheme] = useState("light"); // default claro
    
//     // Aplicar la clase al body al cambiar de tema
//     const applyTheme = (newTheme) => {
//         setTheme(newTheme);
//         document.body.className= newTheme;
//     };

//     // alternar entre light y dark
//     const toggleTheme = () => {
//         applyTheme(theme === 'light' ? 'dark' : 'light');
//     };

//     return (
//         // applyTheme renombramos como setTheme
//         <ThemeContext.Provider value = {{ theme, toggleTheme }}>
//             {children}
//         </ThemeContext.Provider>
//     );

// };

'use client';

import { createContext, useState } from "react";

// Crear el context
export const ThemeContext = createContext();

// Proveedor del contexto
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light"); // default claro
    
    // Aplicar la clase al body al cambiar de tema
    const applyTheme = (newTheme) => {
        setTheme(newTheme);
        document.body.className= newTheme;
    };

    // alternar entre light y dark
    const toggleTheme = () => {
        applyTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        // applyTheme renombramos como setTheme
        <ThemeContext.Provider value = {{ theme, setTheme: applyTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );

};