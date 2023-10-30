import axios from 'axios';
import config from '../Config.js';

// Function to get paymentStatus for a user
export const getPaymentStatus = async (userId) => {
  try {
    const response = await axios.get(`${config.BASE_API_URL}/signup/${userId}/paymentStatus`);
    return response.data.paymentStatus;
  } catch (error) {
    console.error('Error fetching payment status:', error);
    throw error;
  }
};
