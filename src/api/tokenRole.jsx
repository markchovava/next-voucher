"use client"

export const tokenRole = () => {

    const setRoleToken = (token) => {
        if(typeof window !== 'undefined'){
            localStorage.setItem('ROYAL_VOUCHERS_ROLE_TOKEN', token);
        }
    }

    const getRoleToken = () => {
        if(typeof window !== 'undefined'){
            const token =  localStorage.getItem('ROYAL_VOUCHERS_ROLE_TOKEN');
            return token;
        }
    }

    const removeRoleToken = () => {
        if(typeof window !== 'undefined'){
            localStorage.removeItem('ROYAL_VOUCHERS_ROLE_TOKEN');
        }
    }

    return {
        setRoleToken, 
        getRoleToken,
        removeRoleToken
    }

  }