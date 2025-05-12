import "./globals.css";
import Providers from "./providers"; // import your client wrapper

export const metadata = {
  title: "University Course System",
  description: "Course Management Application",
};

export default function RootLayout({ children }) {
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
                <a href="/stats" className="hover:text-gray-200">Statistics</a>
              </nav>
            </div>
          </header>
          <main className="container mx-auto p-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

