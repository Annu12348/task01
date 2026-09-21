import Link from 'next/link';
import React from 'react'
import { MdLightMode } from "react-icons/md";
import { AiTwotoneShop } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
    return (
        <header className="sticky top-0 z-50 border-b-3 border-zinc-300 bg-white">
            <div className="flex h-16 w-full items-center justify-between gap-6 px-5">
                <Link href="/" className="flex shrink-0 items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                        <AiTwotoneShop className='text-2xl' />
                    </div>
                    <span className="text-xl font-bold">ShopEase</span>
                </Link>
                <div className='flex items-center gap-6 '>
                    <Link href="/auth/login" className="text-md bg-blue-500 px-4 py-1 rounded-lg text-white font-semibold capitalize ">
                        login
                    </Link>
                    <Link href="/auth/signup" className="text-md bg-blue-900 px-4 py-1 rounded-lg text-white font-semibold capitalize ">
                        Signup
                    </Link>
                    <button
                        type="button"
                        className="relative flex items-center gap-1 font-medium"
                        title="Cart"
                    >
                        <span className="hidden sm:inline"><AiTwotoneShop className='text-2xl ' /></span>
                        <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
                            0
                        </span>
                    </button>
                    <button
                        type="button"
                        className="hidden text-xl md:block"
                        title="Dark mode"
                    >
                        <MdLightMode />
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Navbar