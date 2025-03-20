import { ThemeProvider } from '@/context/ThemeContext';
import { Typography } from '@/components/ui';
import { SettingsProvider } from '@/context/SettingsContext';

export default function SettingsLayout({ children }) {
  return (
    <>
      <header>
        <Typography variant="h1" color="amber" className="text-center">
          Mission: USE CONTEXT
        </Typography>
      </header>
      <main>
        {/* 🌍 Wrapping con Providers */}
        <ThemeProvider>  {/* 🎨 Proveedor de Tema envuelve todo */}
          <SettingsProvider>  {/* ⚙️ Proveedor de Configuración dentro */}
            {children}  {/* 📌 Todos los hijos tienen acceso a ambos contextos */}
          </SettingsProvider>
        </ThemeProvider>
      </main>
    </>
  );
}
