"use client";

import React, { useState } from "react";
import NavLink from "./links/NavLink";

const navLinks = [
  { name: "Home", href: "/" },
  {
    name: "blog",
    href: "/blog",
  },
  {
    name: "Settings",
    href: "/settings",
  },
];

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="z-10 text-xl">
      <div className="flex justify-between items-center">
        <button onClick={toggleMobileMenu} className="md:hidden mb-4">
          <span className="block w-6 h-1 bg-black mb-1"></span>
          <span className="block w-6 h-1 bg-black mb-1"></span>
          <span className="block w-6 h-1 bg-black"></span>
        </button>
      </div>
      <ul
        className={`flex md:flex-row md:gap-16 gap-4 items-center ${
          isMobileMenuOpen ? "flex" : "hidden md:flex"
        }`}
      >
        {navLinks.map((link) => (
          <NavLink key={link.name} name={link.name} href={link.href} />
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
