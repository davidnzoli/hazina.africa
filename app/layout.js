import { Geist, Geist_Mono } from "next/font/google";
// import Footer from "../components/footer";
// import Navbar from "../components/navBar";

import { Poppins } from "next/font/google";

// Importation de la police avec configuration
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Ajoutez les poids que vous voulez
  style: ["normal", "italic"], // Facultatif
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={poppins.className}>
        {/* <Navbar /> */}
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
