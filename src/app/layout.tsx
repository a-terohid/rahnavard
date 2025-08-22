import "./globals.css";
import 'leaflet/dist/leaflet.css';
import NextAuthProvider from "@/providers/NextAuthProvider";
import { FONTS } from "@/constants/fonts";


export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>){
	   
  return (
    <html lang="fa" dir="rtl" className={FONTS}>
      <body className="font-Vazirmatn">
        <NextAuthProvider>
            { children }
        </NextAuthProvider>
      </body>
    </html>
  );
}