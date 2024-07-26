import { BASE_URL } from ".";


export const getBanners = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products/banners`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching about information:', error);
      return false;
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
      const response = await fetch(`${BASE_URL}/products/videos`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching about information:', error);
      return false;
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
        const response = await fetch(`${BASE_URL}/about/getFAQs`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching about information:', error);
        return false;
      }
    };

    export const getProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products/getProducts`);
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