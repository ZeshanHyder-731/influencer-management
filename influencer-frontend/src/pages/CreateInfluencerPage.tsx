import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocialAccountList } from '../components/SocialAccountList';
import { createInfluencer } from '../services/api';
import { InfluencerFormData, SocialPlatform } from '../types/influencer';

export const CreateInfluencerPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<InfluencerFormData>({
    firstName: '',
    lastName: '',
    socialAccounts: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [newAccount, setNewAccount] = useState({
    platform: 'instagram' as SocialPlatform,
    username: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.slice(0, 50),
    }));
  };

  const handleAccountChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAccount(prev => ({
      ...prev,
      [name]: name === 'platform' ? value as SocialPlatform : value
    }));
  };

  const handleAddAccount = () => {
    if (!newAccount.username.trim()) {
      setError('Username is required');
      return;
    }

    // Check for duplicate username in the same platform
    const isDuplicate = formData.socialAccounts.some(
      account => account.platform === newAccount.platform && 
               account.username.toLowerCase() === newAccount.username.toLowerCase()
    );

    if (isDuplicate) {
      setError(`This username already exists for ${newAccount.platform}`);
      return;
    }

    setFormData(prev => ({
      ...prev,
      socialAccounts: [...prev.socialAccounts, {
        platform: newAccount.platform,
        username: newAccount.username
      }],
    }));

    // Reset username field but keep the same platform
    setNewAccount(prev => ({ ...prev, username: '' }));
    setError(null);
  };

  const handleRemoveAccount = (index: number) => {
    setFormData(prev => ({
      ...prev,
      socialAccounts: prev.socialAccounts.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError('First name and last name are required');
      return;
    }

    if (formData.socialAccounts.length === 0) {
      setError('At least one social account is required');
      return;
    }

    try {
      await createInfluencer(formData);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create influencer. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create New Influencer</h1>
      
      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                required
                maxLength={50}
              />
              <span className="absolute right-3 bottom-2 text-xs text-gray-500">
                {formData.firstName.length}/50
              </span>
            </div>
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                required
                maxLength={50}
              />
              <span className="absolute right-3 bottom-2 text-xs text-gray-500">
                {formData.lastName.length}/50
              </span>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Social Accounts</h3>
            
            <div className="flex flex-col sm:flex-row gap-2 mb-3">
              <select
                name="platform"
                value={newAccount.platform}
                onChange={handleAccountChange}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
              </select>
              <input
                type="text"
                name="username"
                value={newAccount.username}
                onChange={handleAccountChange}
                placeholder="@username"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
              <button
                type="button"
                onClick={handleAddAccount}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  newAccount.username.trim()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!newAccount.username.trim()}
              >
                Add
              </button>
            </div>
            
            <SocialAccountList 
              accounts={formData.socialAccounts} 
              onRemove={handleRemoveAccount} 
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-5 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 rounded-lg font-medium text-white hover:bg-blue-700 transition-all duration-200 shadow-sm"
          >
            Create Influencer
          </button>
        </div>
      </form>
    </div>
  );
};