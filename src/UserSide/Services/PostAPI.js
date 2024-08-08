import axios from "axios";
import { BASE_URL } from ".";

export const token = () => {return localStorage.getItem('token')};
export const userData = localStorage.getItem('userData');

export const login = async (payload) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, payload);
        
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userData', JSON.stringify(response.data));
        localStorage.setItem('role', response.data.role);
        return response.data;

    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

export const addToCart = async (payload) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/cart/add`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response;
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return error;
    }
};
export const updateCart = async (payload) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/cart/updateQuantity/${payload.id}`,
            { quantity: payload?.quantity },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response;
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return error;
    }
};
export const deleteCart = async (payload) => {
    try {
        const response = await axios.delete(
            `${BASE_URL}/cart/removeItem/${payload.id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response;
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return error;
    }
};
export const updateQuestions = async (isCorrect) => {
    try {
        await axios.post(
            `${BASE_URL}/cart/update-is-correct`,
            { is_correct: isCorrect },
            { headers: { Authorization: `Bearer ${token}` } }
        );
    } catch (error) {
        console.error('Error updating cart:', error);
        throw error;
    }
  };