"use client"
/**
 * Works with User Id.
 */

export const tokenId = () => {

    const setIdToken = (token) => {
        if(typeof window !== 'undefined'){
            localStorage.setItem('ROYAL_VOUCHERS_ID_TOKEN', token);
        }
    }

    const getIdToken = () => {
        if(typeof window !== 'undefined'){
            const token =  localStorage.getItem('ROYAL_VOUCHERS_ID_TOKEN');
            return token;
        }
    }

    const removeIdToken = () => {
        if(typeof window !== 'undefined'){
            localStorage.removeItem('ROYAL_VOUCHERS_ID_TOKEN');
        }
    }

    return {
        setIdToken, 
        getIdToken,
        removeIdToken
    }

  }