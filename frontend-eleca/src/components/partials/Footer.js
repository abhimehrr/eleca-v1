import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-4 py-3 px-5 bg-gray-900 rounded-lg">
        <div className="flex items-center justify-between text-gray-400 text-sm">
            <div className="font-medium">
                © {new Date().getFullYear()} 
                <span className="text-teal-400 mx-2">{'>'}</span>
                <Link to="/admin/dashboard" className="hover:text-teal-500">Ashok Electronics</Link>
            </div>

            <div className="flex items-center font-medium">
                Developed 
                <span className="text-teal-400 mx-2">{'>'}</span>
                <Link to="https://abhi.shre.in/" className="hover:text-teal-500" target="_blank">Abhishek</Link>
            </div>
        </div>   
    </footer>
  );
}