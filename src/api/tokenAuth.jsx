"use client"

export const tokenAuth = () => {

    const setAuthToken = (token) => {
        if(typeof window !== 'undefined'){
            localStorage.setItem('ROYAL_VOUCHERS_AUTH_TOKEN', token);
        }
    }

    const getAuthToken = () => {
        if(typeof window !== 'undefined'){
            const token =  localStorage.getItem('ROYAL_VOUCHERS_AUTH_TOKEN');
            return token;
        }
    }

    const removeAuthToken = () => {
        if(typeof window !== 'undefined'){
            localStorage.removeItem('ROYAL_VOUCHERS_AUTH_TOKEN');
        }
    }

    return {
        setAuthToken, 
        getAuthToken,
        removeAuthToken
    }

  }