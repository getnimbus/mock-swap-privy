import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "404 | LP Agent",
    description: "Page Not Found",
  };
}

export default function NotFound() {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-900/20 via-zinc-900 to-orange-900/20">
          <div className="space-y-4 text-center">
            <h1 className="text-2xl font-medium text-white">404</h1>
            <h2 className="text-xl text-zinc-400">Page Not Found</h2>
            <p className="text-zinc-500">
              The page you're looking for doesn't exist.
            </p>
            <Link
              href="/"
              className="inline-block rounded bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
