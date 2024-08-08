import axios from "axios";
import { BASE_URL } from ".";

export const token = localStorage.getItem('token');

export const getBanners = async () => {
  try {
    const response = await fetch(`${BASE_URL}/banners`);
    const data = await response.json();
    return data.banners;
  } catch (error) {
    console.error('Error fetching about information:', error);
    return error;
  }
};

export const getAboutUsData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/about/getAbout`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching about information:', error);
    return false;
  }
};

export const getRecentLuckyDraws = async () => {
  try {

    if (!token) {
      console.error('No token found in localStorage.');
      return false;
    }
    const response = await axios.get(`${BASE_URL}/videos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data?.status === 200) {
      return response.data.videos;
    } else {
      console.error('Unexpected response format:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching videos:', error);
    return error;
  }
};


export const getCart = async () => {
  try {

    if (!token) {
      console.error('No token found in localStorage.');
      return false;
    }

    const response = await axios.get(`${BASE_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data?.status === 200) {
      return response.data?.cart;
    } else {
      console.error('Unexpected response format:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching videos:', error);
    return error;
  }
};

export const getWinners = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products/get-winners`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching about information:', error);
    return false;
  }
};

export const getBlogs = async () => {
  try {
    const response = await fetch(`${BASE_URL}/about/getBlogs`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching about information:', error);
    return false;
  }
};

export const getFaqs = async () => {
  try {
    const response = await fetch(`${BASE_URL}/faqs`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching about information:', error);
    return false;
  }
};

export const getProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching about information:', error);
    return false;
  }
};

export const getVideos = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products/videos`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching about information:', error);
    return error;
  }
};

export const fetchQuestions = async () => {
  try {
      const response = await axios.get(`${BASE_URL}/questions`);
      return response.data;
  } catch (error) {
      console.error('Error fetching questions:', error);
      throw error;
  }
};
