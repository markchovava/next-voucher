"use client"

export const tokenAuth = () => {

    const setAuthToken = (token) => {
        localStorage.setItem('ROYAL_VOUCHERS_AUTH_TOKEN', token);
    }

    const getAuthToken = () => {
        const token =  localStorage.getItem('ROYAL_VOUCHERS_AUTH_TOKEN');
        return token;
    }

    const removeAuthToken = () => {
        localStorage.removeItem('ROYAL_VOUCHERS_AUTH_TOKEN');
    }

    return {
        setAuthToken, 
        getAuthToken,
        removeAuthToken
    }

  }