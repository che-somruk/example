import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 flex flex-col gap-6 w-80 text-center">        
        <nav className="flex flex-col gap-4">
          <Link
            href="/backend/task1"
            className="block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Backend Task 1
          </Link>
          
          <Link
            href="/backend/task2"
            className="block px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Backend Task 2
          </Link>
          
          <Link
            href="/frontend"
            className="block px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
          >
            Frontend
          </Link>
        </nav>
      </div>
    </div>
  );
}
