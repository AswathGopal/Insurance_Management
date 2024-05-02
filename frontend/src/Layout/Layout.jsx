import React from 'react'
import Hero from '../Components/Hero';
import Footer from '../Components/Footer';
const Layout = ({children}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <div className=" container mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout
