'use client';

import React, { useState } from 'react';
import clsx from 'clsx';

interface Button3DProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'dark';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    shadowHeight?: number;
    type?: 'button' | 'submit' | 'reset';
    as?: 'button' | 'div';
}

const Button3D: React.FC<Button3DProps> = ({
    children,
    onClick,
    className = '',
    variant = 'primary',
    size = 'md',
    disabled = false,
    shadowHeight = 6,
    type = 'button',
    as = 'button',
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

    const Component = as;

    return (
        <Component
            type={as === 'button' ? type : undefined}
            onClick={disabled ? undefined : onClick}
            onMouseDown={() => !disabled && setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
            onTouchStart={() => !disabled && setIsPressed(true)}
            onTouchEnd={() => setIsPressed(false)}
            className={clsx(
                baseStyles,
                sizeStyles[size],
                variantStyles[variant],
                disabled && 'opacity-50 cursor-not-allowed',
                !disabled && 'cursor-pointer',
                className
            )}
            style={{
                boxShadow: isPressed || disabled
                    ? 'none'
                    : `0 ${shadowHeight}px 0 0 ${shadowColorValues[variant]}`,
                transform: isPressed ? `translateY(${shadowHeight}px)` : 'translateY(0)',
            }}
            disabled={as === 'button' ? disabled : undefined}
        >
            {children}
        </Component>
    );
};

export default Button3D;
