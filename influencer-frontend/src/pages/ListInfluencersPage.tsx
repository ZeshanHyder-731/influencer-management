import { useEffect, useState } from 'react';
import { getInfluencers } from '../services/api';
import { Influencer } from '../types/influencer';

export const ListInfluencersPage = () => {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        setLoading(true);
        const data = await getInfluencers(searchTerm);
        setInfluencers(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch influencers. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchInfluencers();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const groupAccountsByPlatform = (accounts: { platform: string; username: string }[]) => {
    return accounts.reduce((acc, account) => {
      if (!acc[account.platform]) {
        acc[account.platform] = [];
      }
      acc[account.platform].push(account.username);
      return acc;
    }, {} as Record<string, string[]>);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Influencer Directory</h1>
        <p className="text-gray-600">Browse and search through our network of influencers</p>
      </div>
      
      <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
          Search Influencers
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            id="search"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading influencers...</p>
        </div>
      ) : influencers.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No influencers found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? "Try a different search term" : "There are currently no influencers in the system"}
          </p>
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-xl border border-gray-100">
          <ul className="divide-y divide-gray-200">
            {influencers.map((influencer) => {
              const groupedAccounts = groupAccountsByPlatform(influencer.socialAccounts);
              
              return (
                <li key={influencer._id} className="hover:bg-gray-50 transition-colors duration-150">
                  <div className="px-6 py-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-gray-900 capitalize">
                        {influencer.firstName} {influencer.lastName}
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {influencer.socialAccounts.length} social account(s)
                      </span>
                    </div>
                    <div className="mt-3">
                      {Object.entries(groupedAccounts).map(([platform, usernames]) => (
                        <div key={platform} className="mb-3 last:mb-0 flex items-start">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800 mr-3 capitalize">
                            {platform}:
                          </span>
                          <span className='pr-2 text-blue-400'>→ </span>
                          <div className="flex flex-wrap gap-2">
                            {usernames.map((username) => (
                              <span key={username} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                                @{username}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};