"use client"
import Navbar from "./navbar"
import { usePathname } from "next/navigation"

export default function NavbarWrapper(){
    const pathname = usePathname();
    const isFamilyTreeRoute = pathname.startsWith("/family-tree");
    return (
        <>
            <Navbar/>
        </>
    )
}