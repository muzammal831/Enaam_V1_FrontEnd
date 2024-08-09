import React, { createContext, useContext, useState, useEffect } from 'react';
import { BASE_URL } from '.';
import axios from 'axios';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userData, setUser] = useState(null);
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const [winners, setWinners] = useState([]);
  const [videos, setRecentVideos] = useState([]);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserData = await localStorage.getItem('userData');
        if (storedUserData) {
          setUser(JSON.parse(storedUserData));
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    loadUserData();
    getBanners();
    getVideos();
    // getWinners();
    getProducts();
    getCart();
  }, []);

useEffect(() => {
    const saveUserData = async () => {
        try {
            if (userData) {
                localStorage.setItem('userData', JSON.stringify(userData));
            } else {
                localStorage.removeItem('userData');
            }
        } catch (error) {
            console.error('Failed to save user data:', error);
        }
    };
    saveUserData();
}, [userData]);

  const login = async (payload) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, payload);
      setUser(response?.data?.user );
      return response.data;
    } catch (error) {
      console.error('Error during sign in:', error);
      alert(error);
      setUser(null);
      return false;
    }
  };

  const signUp = async (payload) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/signup`, payload);
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error('Error during sign up:', error);
      setUser(null);
      return false;
    }
  };

  const updateProfile = async (payload) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/updateProfile`, payload);
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error('Error during profile update:', error);
      setUser(null);
      return false;
    }
  };

   const getBanners = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/banners`);
      const data = await response.json();
      if (window.innerWidth <= 768) {
        const mobileBanners = data?.banners.filter(
          (banner) => banner.platform === "mobile" || banner.platform === "both"
        );
        setBanners(mobileBanners);
      } else {
        const desktopBanners = data?.banners.filter(
          (banner) => banner.platform === "desktop" || banner.platform === "both"
        );
        setBanners(desktopBanners);
      } 
      setLoading(false)
      return data;
    } catch (error) {
      console.error('Error fetching about information:', error);
      setBanners([])
      setLoading(false)
      return error;
    }
  };

  const getVideos = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/videos`);
      const data = await response.json();
      setRecentVideos(data)
      setLoading(false)
      return data;
    } catch (error) {
      console.error('Error fetching about information:', error);
      setRecentVideos([])
      setLoading(false)
      return false;
    }
  };

   const getWinners = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/products/get-winners`);
      const data = await response.json();
      setWinners(data)
      setLoading(false)
      return data;
    } catch (error) {
      console.error('Error fetching about information:', error);
      setWinners([])
      setLoading(false)
      return error;
    }
  };
  const getProducts = async () => {
    // setLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/products`);
      const data = await response.json();
      setLoading(false)
      setProducts(data?.products)
      return data;
    } catch (error) {
      console.error('Error fetching about information:', error);
      setLoading(false)
      setProducts([])
      return error;
    }
  };
  const addToCart = async (payload) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/cart/add`,
         payload,
         {headers: {Authorization: `Bearer ${userData?.token}`}
      }
      );
      getCart()
      return response;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      setProducts([]);
      setLoading(false);
      return error;
    }
  };

  const updateCart = async (payload) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/cart/updateQuantity/${payload.id}`,
            { quantity: payload?.quantity },
            {
                headers: {
                    Authorization: `Bearer ${userData?.token}`
                }
            }
        );

        getCart();
        return response;
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return error;
    }
};

  const removeFromCart = async (payload) => {
    // setLoading(true)
    try {
      const response = await axios.delete(
        `${BASE_URL}/cart/removeItem/${payload.id}`,
        {
            headers: {
                Authorization: `Bearer ${userData?.token}`
            }
        }
    )
      getCart();
      setLoading(false);
      return response;
    } catch (error) {
      console.error('Error removing item from cart:', error);
      setProducts([]);
      setLoading(false);
      return error;
    }
  }
  const getCart = async () => {
    // setLoading(true)
    try {
      const response = await axios.get(`${BASE_URL}/cart`,{headers: {Authorization: `Bearer ${userData?.token}`}});
      setCartData(response?.data?.data)
      if (response.data?.status === 200) {
        setCartData(response?.data?.data)
        return response.data?.cart;
      } else {
        console.error('Unexpected response format:', response.data);
        return [];
      }
    } catch (error) {
      console.error('Error fetching about information:', error);
      setProducts([])
      setLoading(false)
      return error;
    }
  };

  const getQuesions = async () => {
    try {
      const response = await fetch(`${BASE_URL}/questions/des/quiz-question`);
      const data = await response.json();
      return data?.data;
    } catch (error) {
      console.error('Error fetching about information:', error);
      return false;
    }
  };

  const logout = async () => {
    setUser(null);
    try {
      await localStorage.removeItem('userData');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        userData,
        banners,
        winners,
        loading,
        products,
        cartData,
        videos,
        login,
        getCart,
        updateCart,
        getBanners,
        getVideos,
        addToCart,
        getProducts,
        getWinners,
        getQuesions,
        updateProfile,
        removeFromCart,
        logout
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
