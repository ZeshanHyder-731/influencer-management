import { Request, Response } from 'express';
import { Influencer, IInfluencer, ISocialAccount } from '../models/influencer';

export const createInfluencer = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, socialAccounts } = req.body;
    
    const influencer = new Influencer({
      firstName,
      lastName,
      socialAccounts,
    });

    await influencer.save();
    res.status(201).json(influencer);
  } catch (error: any) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};

export const getInfluencers = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    let query = {};

    if (name) {
      query = {
        $or: [
          { firstName: { $regex: name as string, $options: 'i' } },
          { lastName: { $regex: name as string, $options: 'i' } },
        ],
      };
    }

    const influencers = await Influencer.find(query);
    res.json(influencers);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};