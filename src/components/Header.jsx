"use client";
import { tokenRole } from '@/api/tokenRole';
import NavAdmin from './NavAdmin'
import NavMain from './NavMain'
import { tokenAuth } from '@/api/tokenAuth';



export default function Header() {
  const { getRoleToken } = tokenRole();
  const { getAuthToken } = tokenAuth();
  

  return (
    <>
      { getAuthToken() && getRoleToken() && getRoleToken() <= 3 &&
      <NavAdmin /> }
      <NavMain />
    </>
  )
}
