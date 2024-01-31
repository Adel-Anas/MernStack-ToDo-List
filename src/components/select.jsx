import React from 'react';
import { cn } from '../utils/cn.tsx';

const Button =({variant="default", className,children, ...rest})=>{
    return (

        <button className={
            cn(
                "w-28 h-10 rounded font-[Poppins] hover:scale-105 duration-500",
                variant === "default" && "bg-white",
                variant === "primary" && "bg-blue-600",
                variant === "danger" && "bg-red-600 text-white",
                variant === "success" && "bg-green-600 text-white",
                variant === "warning" && "bg-yellow-600",
                variant === "info" && "bg-blue-600 text-white",
                variant === "light" && "bg-gray-200",
                variant === "dark" && "bg-gray-800 text-white",
                className)}
                {...rest}>
            {children}
        </button>
    )
}

export default Button;