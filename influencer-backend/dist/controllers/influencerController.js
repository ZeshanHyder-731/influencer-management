"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInfluencers = exports.createInfluencer = void 0;
const influencer_1 = require("../models/influencer");
const createInfluencer = async (req, res) => {
    try {
        const { firstName, lastName, socialAccounts } = req.body;
        const influencer = new influencer_1.Influencer({
            firstName,
            lastName,
            socialAccounts,
        });
        await influencer.save();
        res.status(201).json(influencer);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.createInfluencer = createInfluencer;
const getInfluencers = async (req, res) => {
    try {
        const { name } = req.query;
        let query = {};
        if (name) {
            query = {
                $or: [
                    { firstName: { $regex: name, $options: 'i' } },
                    { lastName: { $regex: name, $options: 'i' } },
                ],
            };
        }
        const influencers = await influencer_1.Influencer.find(query);
        res.json(influencers);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getInfluencers = getInfluencers;
