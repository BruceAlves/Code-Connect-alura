import { Prompt } from "next/font/google";
import { Aside } from "@/components/Aside";
import "./globals.css";
import { SearchForm } from "@/components/SearchForm";
import { ReactQueryProvider } from "./ReactQueryProvider";

export const metadata = {
  title: "Code Connect",
  description: "Uma rede social para devs!",
};

const prompt = Prompt({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={prompt.className}>
      <body>
        <ReactQueryProvider>
          <div className="app-container">
            <div>
              <Aside />
            </div>
            <div className="main-content">
              <SearchForm />
              {children}
            </div>
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
