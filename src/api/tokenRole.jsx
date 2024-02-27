"use client"

export const tokenRole = () => {

    const setRoleToken = (token) => {
        localStorage.setItem('ROYAL_VOUCHERS_ROLE_TOKEN', token);
    }

    const getRoleToken = () => {
        const token =  localStorage.getItem('ROYAL_VOUCHERS_ROLE_TOKEN');
        return token;
    }

    const removeRoleToken = () => {
        localStorage.removeItem('ROYAL_VOUCHERS_ROLE_TOKEN');
    }

    return {
        setRoleToken, 
        getRoleToken,
        removeRoleToken
    }

  }