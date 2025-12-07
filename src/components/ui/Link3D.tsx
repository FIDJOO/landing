'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

interface Link3DProps {
    children: React.ReactNode;
    href: string;
    onClick?: () => void;
    className?: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'dark';
    size?: 'sm' | 'md' | 'lg';
    shadowHeight?: number;
}

const Link3D: React.FC<Link3DProps> = ({
    children,
    href,
    onClick,
    className = '',
    variant = 'primary',
    size = 'md',
    shadowHeight = 6,
}) => {
    const [isPressed, setIsPressed] = useState(false);

    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-2xl border-2 transition-transform duration-75 select-none';

    const sizeStyles = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    const variantStyles = {
        primary: 'bg-primary text-black border-primary-dark',
        secondary: 'bg-secondary text-foreground border-secondary-dark',
        outline: 'bg-white text-foreground border-gray-300',
        dark: 'bg-foreground text-white border-gray-800',
    };

    const shadowColorValues: Record<string, string> = {
        primary: 'var(--primary-dark)',
        secondary: 'var(--secondary-dark)',
        outline: '#d1d5db',
        dark: '#1f2937',
    };

    return (
        <Link
            href={href}
            onClick={onClick}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
            onTouchStart={() => setIsPressed(true)}
            onTouchEnd={() => setIsPressed(false)}
            className={clsx(
                baseStyles,
                sizeStyles[size],
                variantStyles[variant],
                'cursor-pointer',
                className
            )}
            style={{
                boxShadow: isPressed
                    ? 'none'
                    : `0 ${shadowHeight}px 0 0 ${shadowColorValues[variant]}`,
                transform: isPressed ? `translateY(${shadowHeight}px)` : 'translateY(0)',
            }}
        >
            {children}
        </Link>
    );
};

export default Link3D;
