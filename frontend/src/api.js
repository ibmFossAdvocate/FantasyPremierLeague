import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000';

export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const draftTeam = async (userId, gameweek, players, captain, viceCaptain) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/draft`, {
      user_id: userId,
      gameweek,
      players,
      captain,
      vice_captain: viceCaptain,
    });
    return response.data;
  } catch (error) {
    console.error('Error drafting team:', error);
    throw error;
  }
};