import "./global.css";
import { AuthContextProvider } from "./_utils/auth-context";


export const metadata = {
  title: "The Game Shelf",
  description: "Keep track of your games! [Powered by RAWG API]",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}