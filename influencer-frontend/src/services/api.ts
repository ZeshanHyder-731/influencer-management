import axios from 'axios';
import { Influencer, InfluencerFormData } from '../types/influencer';

const API_BASE_URL = 'http://localhost:5000/api/influencers';

export const createInfluencer = async (influencerData: InfluencerFormData): Promise<Influencer> => {
  const response = await axios.post(API_BASE_URL, influencerData);
  return response.data;
};

export const getInfluencers = async (name?: string): Promise<Influencer[]> => {
  const params = name ? { name } : {};
  const response = await axios.get(API_BASE_URL, { params });
  return response.data;
};