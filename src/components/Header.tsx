'use client'

import { ClerkLoaded, SignedIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import useBasketStore from "../../store/store";
import { Button } from "./ui/button";
import { Box, Search, ShoppingCart, User, X } from 'lucide-react';
import { useState } from "react";
import { CartModal } from './cart/CartModal'
import { motion } from "framer-motion";

function Header() {

  
  const { user } = useUser();

  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.cantidad, 0)
  );

  const [showSearch, setShowSearch] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const HeaderContent = () => (
    <>
      {showSearch ? (
        <Form action='/search' className="relative">
          <input
            type="text"
            name="query"
            placeholder="Buscar productos..."
            className="w-full md:w-64 rounded-md border-0 bg-white px-2 py-2 text-sm text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            autoFocus
            onBlur={() => setShowSearch(false)}
          />
        </Form>
      ) : (
        <Button
          variant="ghost"
          className="text-gray-700 hover:text-[#0E1D35] w-full justify-start"
          onClick={() => setShowSearch(true)}
        >
          <Search className="w-5 h-5" />
          <span className="ml-2">Search</span>
        </Button>
      )}
      <Button variant="ghost" className="text-gray-700 hover:text-[#0E1D35] w-full justify-start" onClick={() => setIsCartOpen(true)}>
        <div className="flex items-center">
          <ShoppingCart className="w-5 h-5" />
          <span className="ml-2">Cart ({itemCount})</span>
        </div>
      </Button>
      <ClerkLoaded>
        <SignedIn>
          <Button variant="ghost" className="text-gray-700 hover:text-[#0E1D35] w-full justify-start">
            <Link href="/orders" className="flex items-center">
              <Box className="w-5 h-5" />
              <span className="ml-2">Ordenes</span>
            </Link>
          </Button>
        </SignedIn>

        {user ? (
          <div className="w-full">
            <Button variant="ghost" className="text-gray-700 hover:text-[#0E1D35] w-full justify-start">
              <UserButton />
              <span className="ml-2">{user.fullName}</span>
            </Button>
          </div>
        ) : (
          <Button variant="ghost" className="text-gray-700 hover:text-[#0E1D35] w-full justify-start">
            <SignInButton mode="modal">
              <div className="flex items-center">
                <User className="w-5 h-5" />
                <span className="ml-2">Ingresar</span>
              </div>
            </SignInButton>
          </Button>
        )}
      </ClerkLoaded>

    </>
  );

  return (
    <>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-full py-6 px-6 bg-white sticky top-0 z-50 border-b border-gray-100 opacity-90">
       
        <div className="max-w-7xl mx-auto flex items-center  justify-between">
          <Link href="/" className="text-2xl font-bold text-[#0E1D35] text-nowrap">
            ELI<span className="text-[#A2C2F4]">X</span>ERIUM OD<span className="text-[#A2C2F4]">O</span>R
          </Link>
          <Button variant="ghost" className="text-gray-700 hover:text-[#0E1D35] w-full justify-end sm:hidden block font-semibold" onClick={() => setIsCartOpen(true)}>
            <div className="flex items-center">
              <ShoppingCart className="w-5 h-5" />
              <span className="ml-2">Cart ({itemCount})</span>
            </div>
          </Button>
          <button className="lg:hidden" onClick={toggleMobileMenu}>
            <div className="space-y-2">
              {isMobileMenuOpen ? (
                <X className="w-8 h-8 text-gray-900" />
              ) : (
                <>
                  <div className="w-8 h-0.5 bg-gray-900"></div>
                  <div className="w-8 h-0.5 bg-gray-900"></div>
                  <div className="w-8 h-0.5 bg-gray-900"></div>
                </>
              )}
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-8">
            <HeaderContent />
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white">
          <div className="flex flex-col p-6 space-y-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-[#0E1D35]">
                ELI<span className="text-[#A2C2F4]">X</span>ERIUM OD<span className="text-[#A2C2F4]">O</span>R
              </Link>
              <button onClick={toggleMobileMenu}>
                <X className="w-8 h-8 text-gray-900" />
              </button>
            </div>
            <HeaderContent  />
          </div>
        </div>
      )}

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  )
}

export default Header