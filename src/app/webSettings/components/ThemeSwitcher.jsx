"use client"; // 👈 Esto indica que es un Client Component

import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react"; // ✅ Usamos `Menu` de Material Tailwind

export function ThemeSwitcher() {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <Menu>
          <MenuHandler>
            <Button variant="outlined" size="sm">
              {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </MenuHandler>
          <MenuList>
            <MenuItem onClick={() => setTheme("light")}>☀️ Light</MenuItem>
            <MenuItem onClick={() => setTheme("dark")}>🌙 Dark</MenuItem>
          </MenuList>
        </Menu>
    );
}




// ⚡NECESARIO INSTALAR dropdownmenu ⚡
// import { useContext } from "react";
// import { ThemeContext } from '@/context/ThemeContext'
// import { Sun, Moon } from "lucide-react"; // Asegura que estos iconos están disponibles
// import {
//   Button,
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui";

// export function ThemeSwitcher () {
//     const { theme, setTheme } = useContext(ThemeContext);

//     return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline" size="icon">
//               {/* Icono de Sol (Light Mode) */}
//               <Sun className={`h-[1.2rem] w-[1.2rem] transition-all ${
//                 theme === "light" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
//               }`} />
//               {/* Icono de Luna (Dark Mode) */}
//               <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
//                 theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"
//               }`} />
//               <span className="sr-only">Toggle theme</span>
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuItem onClick={() => setTheme("light")}>
//               ☀️ Light
//             </DropdownMenuItem>
//             <DropdownMenuItem onClick={() => setTheme("dark")}>
//               🌙 Dark
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//     );
// };
