import { Schema, model, Document } from 'mongoose';

export interface ISocialAccount {
  platform: 'instagram' | 'tiktok';
  username: string;
}

export interface IInfluencer extends Document {
  firstName: string;
  lastName: string;
  socialAccounts: ISocialAccount[];
}

const socialAccountSchema = new Schema<ISocialAccount>({
  platform: { type: String, enum: ['instagram', 'tiktok'], required: true },
  username: { type: String, required: true, lowercase: true },
});

const influencerSchema = new Schema<IInfluencer>({
  firstName: { type: String, required: true, maxlength: 50 },
  lastName: { type: String, required: true, maxlength: 50 },
  socialAccounts: [socialAccountSchema],
});

influencerSchema.pre('save', function(next) {
    const accounts = this.socialAccounts;
    const seen = new Map<string, Set<string>>();
  
    for (const account of accounts) {
      if (!seen.has(account.platform)) {
        seen.set(account.platform, new Set());
      }
      
      const usernames = seen.get(account.platform)!;
      const lowercaseUsername = account.username.toLowerCase();
      
      if (usernames.has(lowercaseUsername)) {
        return next(new Error(`Duplicate username '${account.username}' for ${account.platform}`));
      }
      
      usernames.add(lowercaseUsername);
    }
    
    next();
  });

export const Influencer = model<IInfluencer>('Influencer', influencerSchema);