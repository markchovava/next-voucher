"use client";
import { tokenRole } from '@/api/tokenRole';
import NavAdmin from './NavAdmin'
import NavMain from './NavMain'

export default function Header() {
  const { getRoleToken } = tokenRole();
  return (
    <>
    {getRoleToken() <= 3 &&
      <NavAdmin />
    }
      <NavMain />
    </>
  )
}
