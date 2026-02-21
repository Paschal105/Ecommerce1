import { Nav, NavLink } from "@/components/Nav";

export default function Adminlayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return <>
      
        <Nav>
            <NavLink href="/admin" >Dashboard</NavLink>
            <NavLink href="/admin/product" >Products</NavLink>
            <NavLink href="/admin/users" >Customers</NavLink>
            <NavLink href="/adminorders" >Sales</NavLink>
        </Nav>
        <div className="container my-6">{children}</div>
    
    </>
}