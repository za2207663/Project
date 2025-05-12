// app/layout.js
import "./globals.css";
import Providers from "./providers";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata = {
  title: "University Course System",
  description: "Course Management Application",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions); // Server-safe
  console.log("Session in layout:", session);
  return (
    <html lang="en">
  
      <body>
        <Providers>
          <header className="bg-gray-900 text-white p-4">
            <div className="container mx-auto">
              <h1 className="text-2xl font-bold">University Course System</h1>
              <nav className="mt-2">
                <a href="/admin" className="mr-4 hover:text-gray-200">Admin</a>
                <a href="/instructor" className="mr-4 hover:text-gray-200">Instructor</a>
                {/* ✅ Only show if logged in */}
                {session?.user && (
                  <a href="/stats" className="hover:text-gray-200">Statistics</a>
                )}
              </nav>
            </div>
          </header>
          <main className="container mx-auto p-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}



