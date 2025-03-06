import { Github, Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary py-4 px-6 shadow-md mt-auto">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white font-medium">
          © {currentYear} Krunal Gupta
        </div>

        <div className="flex items-center gap-2 text-white font-medium">
          Made with{" "}
          <Heart
            className="h-4 w-4 text-red-500 animate-pulse"
            fill="currentColor"
          />
        </div>

        <Link
          href="https://github.com/krunalgupta02"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-sky-800 transition-colors duration-300"
        >
          <Github className="h-5 w-5" />
          <span className="sr-only">GitHub</span>
        </Link>
      </div>
    </footer>
  );
}
