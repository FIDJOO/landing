'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { HiOutlineXMark, HiBars3 } from 'react-icons/hi2';
import Image from 'next/image';

import Container from './Container';
import Link3D from './ui/Link3D';
import { siteDetails } from '@/data/siteDetails';
import { menuItems } from '@/data/menuItems';
import { blogPosts } from '@/data/blog';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuButtonPressed, setIsMenuButtonPressed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 mx-auto w-full transition-all duration-300 ${
            isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'
        }`}>
            <Container className="!px-0">
                <nav className={`shadow-md md:shadow-none bg-white md:bg-transparent mx-auto flex justify-between items-center py-2 px-5 transition-all duration-300 ${
                        isScrolled ? 'md:py-4' : 'md:py-10'
                    }`}>
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Image src={siteDetails.textLogo} alt={siteDetails.siteName} width={120} height={50} />
                        
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex items-center space-x-6">
                        {menuItems.map(item => (
                            <li key={item.text}>
                                <Link href={item.url} className="text-foreground hover:text-foreground-accent transition-colors">
                                    {item.text}
                                </Link>
                            </li>
                        ))}
                        {/* Blog with dropdown */}
                        <li className="relative group">
                            <Link href="/blog" className="text-foreground hover:text-foreground-accent transition-colors">
                                Blog
                            </Link>
                            {/* Dropdown */}
                            <div className="absolute left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 w-80">
                                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Derniers articles</p>
                                    <ul className="space-y-3">
                                        {blogPosts.slice(0, 3).map(post => (
                                            <li key={post.slug}>
                                                <Link
                                                    href={`/blog/${post.slug}`}
                                                    className="block hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors"
                                                >
                                                    <p className="text-sm font-medium text-foreground line-clamp-1">{post.title}</p>
                                                    <p className="text-xs text-gray-500 mt-1">{post.readTime}</p>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        href="/blog"
                                        className="block text-center text-sm text-primary hover:text-primary-dark font-medium mt-4 pt-3 border-t border-gray-100"
                                    >
                                        Voir tous les articles →
                                    </Link>
                                </div>
                            </div>
                        </li>
                        {/* Contact */}
                        <li>
                            <Link href="/contact" className="text-foreground hover:text-foreground-accent transition-colors">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link3D href="#cta" variant="primary" size="sm" shadowHeight={4}>
                                Download
                            </Link3D>
                        </li>
                    </ul>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            onMouseDown={() => setIsMenuButtonPressed(true)}
                            onMouseUp={() => setIsMenuButtonPressed(false)}
                            onMouseLeave={() => setIsMenuButtonPressed(false)}
                            onTouchStart={() => setIsMenuButtonPressed(true)}
                            onTouchEnd={() => setIsMenuButtonPressed(false)}
                            type="button"
                            className="bg-primary text-black focus:outline-none rounded-2xl w-10 h-10 flex items-center justify-center border-2 border-primary-dark transition-transform duration-75 select-none"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                            style={{
                                boxShadow: isMenuButtonPressed
                                    ? 'none'
                                    : '0 4px 0 0 var(--primary-dark)',
                                transform: isMenuButtonPressed ? 'translateY(4px)' : 'translateY(0)',
                            }}
                        >
                            {isOpen ? (
                                <HiOutlineXMark className="h-6 w-6" aria-hidden="true" />
                            ) : (
                                <HiBars3 className="h-6 w-6" aria-hidden="true" />
                            )}
                            <span className="sr-only">Toggle navigation</span>
                        </button>
                    </div>
                </nav>
            </Container>

            {/* Mobile Menu with Transition */}
            <Transition
                show={isOpen}
                enter="transition ease-out duration-200 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div id="mobile-menu" className="md:hidden bg-white shadow-lg">
                    <ul className="flex flex-col space-y-4 pt-1 pb-6 px-6">
                        {menuItems.map(item => (
                            <li key={item.text}>
                                <Link href={item.url} className="text-foreground hover:text-primary block" onClick={toggleMenu}>
                                    {item.text}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link href="/blog" className="text-foreground hover:text-primary block" onClick={toggleMenu}>
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="text-foreground hover:text-primary block" onClick={toggleMenu}>
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link3D href="#cta" variant="primary" size="sm" shadowHeight={4} onClick={toggleMenu}>
                                Get Started
                            </Link3D>
                        </li>
                    </ul>
                </div>
            </Transition>
        </header>
    );
};

export default Header;
