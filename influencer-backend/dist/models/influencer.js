"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Influencer = void 0;
const mongoose_1 = require("mongoose");
const socialAccountSchema = new mongoose_1.Schema({
    platform: { type: String, enum: ['instagram', 'tiktok'], required: true },
    username: { type: String, required: true },
});
const influencerSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true, maxlength: 50 },
    lastName: { type: String, required: true, maxlength: 50 },
    socialAccounts: [socialAccountSchema],
});
// Validate that an influencer can't have duplicate platform accounts
influencerSchema.path('socialAccounts').validate(function (accounts) {
    const platforms = accounts.map(account => account.platform);
    return new Set(platforms).size === platforms.length;
}, 'An influencer cannot have multiple accounts on the same platform');
exports.Influencer = (0, mongoose_1.model)('Influencer', influencerSchema);
