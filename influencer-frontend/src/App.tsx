import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ListInfluencersPage } from './pages/ListInfluencersPage';
import { CreateInfluencerPage } from './pages/CreateInfluencerPage';
import { Toaster } from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { Navigation } from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                  <span className="text-blue-600">Adcash</span> Influencer Hub
                </h1>
              </div>
              <Navigation />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<ListInfluencersPage />} />
            <Route path="/create" element={<CreateInfluencerPage />} />
          </Routes>
        </main>

        {/* Toast Notifications */}
        <Toaster 
          position="top-center"
          toastOptions={{
            className: 'font-medium rounded-lg',
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: 'white',
              },
              style: {
                background: '#ECFDF5',
                color: '#065F46',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: 'white',
              },
              style: {
                background: '#FEE2E2',
                color: '#B91C1C',
              },
            },
          }}
        />

        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6">
          <a
            href="/create"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors"
            aria-label="Add new influencer"
          >
            <FiPlus className="h-6 w-6" />
          </a>
        </div>
      </div>
    </Router>
  );
}

export default App;