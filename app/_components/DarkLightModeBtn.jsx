import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

const DarkLightModeBtn = () => {
    const { theme, setTheme, resolvedTheme } = useTheme();

    const toggleTheme = () => {
        if (resolvedTheme === "light") setTheme("dark");
        if (resolvedTheme === "dark") setTheme("light");
    };
    return (
        <div className="flex gap-2 items-center">
            <button type="button" onClick={toggleTheme}>
                {theme == "dark" ? (
                    <Moon onClick={toggleTheme} className="text-2xl animate-fade-in-right text-white hover:text-purple cursor-pointer"
                    />
                ) : (
                    <Sun onClick={toggleTheme} className="text-2xl animate-fade-in-right text-sky-400 cursor-pointer"
                    />
                )}
            </button>
        </div>
    );
};

export default DarkLightModeBtn;
