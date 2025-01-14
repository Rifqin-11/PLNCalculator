import React from 'react'
import { Instagram, Mail, Send } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow m-4">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 PLN Calculator All Rights Reserved.
        </span>
        <ul className="flex flex-wrap gap-7 items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
                <a href="https://www.instagram.com/rifqin11_/" className="hover:underline"><Instagram className="w-5 h-5" /></a>
            </li>
            <li>
                <a href="mailto:rifqinaufal9009@gmail.com" className="hover:underline"><Mail className="w-5 h-5" /></a>
            </li>
            <li>
                <a href="#" className="hover:underline"><Send className="w-5 h-5" /></a>
            </li>
        </ul>
        </div>
    </footer>
  )
}

export default Footer