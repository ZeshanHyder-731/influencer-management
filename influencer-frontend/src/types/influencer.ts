export type SocialPlatform = 'instagram' | 'tiktok';

export interface SocialAccount {
  platform: SocialPlatform;
  username: string;
}

export interface Influencer {
  _id: string;
  firstName: string;
  lastName: string;
  socialAccounts: SocialAccount[];
}

export interface InfluencerFormData {
  firstName: string;
  lastName: string;
  socialAccounts: SocialAccount[];
}