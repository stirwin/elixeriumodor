"use client"

import { ClerkLoaded, SignedIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";

function Header() {
  const { user } = useUser();

  const createClerkPasskey = async () => {
    
  };

  return (
    <header className=" flex flex-wrap justify-between items-center px-4 py-2">
      {/* top row*/}
      <div className="flex w-full flex-wrap justify-between items-center">
        <Link href="/" className="text-lg font-bold text-blue-500 hover:opacity-50 transition-opacity 
        duration-300 cursor-pointer mx-auto sm:mx-0">
        Shop
        </Link>

        <Form action='/search'
        className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0">
          <input type="text" name="query" placeholder="Buscar productos..."
          className="w-full rounded-md border-0 bg-white px-2 py-2 text-sm text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
        </Form>

        <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
          <Link href="/basket" className=" flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center text-sm font-medium text-white bg-blue-500 rounded-md px-4 py-2 cursor-pointer">
            <TrolleyIcon className="w-6 h-6" />
            {/*recuento de elementos de span una vez que se agreguen productos*/}
            <span>View basket</span>
          </Link>

          {/*user icon*/}
         
          <ClerkLoaded> 
            {/*si el usuario esta logueado*/}
            <SignedIn>
              <Link href="/orders"
              className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center text-sm font-medium text-white bg-blue-500 rounded-md px-4 py-2 cursor-pointer">
                <PackageIcon className="w-6 h-6" />
                <span>Mis ordenes</span>
              </Link>
           </SignedIn>

            {/*si el usuario esta logueado*/}
            {user ?(
              <div>
                <UserButton />
                <div className="hidden sm:block text-xs">
                  <p className="text-gray-400">Bienvenido de nuevo</p>
                  <p className="text-gray-400">{user.fullName}</p>
                </div>
              </div>
            ) : (
              //si el usuario no esta logueado
              <SignInButton mode="modal" />
            )}

            {user?.passkeys.length=== 0 && (
              <button 
              onClick={createClerkPasskey}
              className="bg-white animate-pulse text-blue-500 font-bold
              rounded-md px-4 py-2 cursor-pointer border">
                <span>crear llave maestra</span>
              </button>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  )
}

export default Header
