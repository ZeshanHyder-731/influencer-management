import { SocialAccount } from '../types/influencer';

interface SocialAccountListProps {
  accounts: SocialAccount[];
  onRemove: (index: number) => void;
}

export const SocialAccountList = ({ accounts, onRemove }: SocialAccountListProps) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Social Accounts</h3>
      {accounts.length === 0 ? (
        <p className="text-gray-500">No accounts added</p>
      ) : (
        <ul className="space-y-2">
          {accounts.map((account, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded">
              <span>
                <span className="font-medium capitalize">{account.platform}: </span>
                {account.username}
              </span>
              <button
                onClick={() => onRemove(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};