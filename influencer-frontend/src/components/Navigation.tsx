export function Navigation() {
    return (
      <nav className="flex space-x-8">
        <a
          href="/"
          className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium uppercase tracking-wide"
        >
          Influencers
        </a>
        <a
          href="/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
        >
          Add New
        </a>
      </nav>
    );
  }