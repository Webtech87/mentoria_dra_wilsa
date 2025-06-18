import { useState, useEffect, useCallback, useRef } from 'react';
import './Navbar.css';
import i18n from "i18next";
import logo from "../../assets/img/dws-logo.svg"
import { useTranslation } from "react-i18next";

// Language type
type Language = 'pt' | 'en';

// Nav item interface
interface NavItem {
    id: string;
    label: string;
    href: string;
    targetId: string;
}

const Navbar = () => {
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState<Language>('pt');
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [isClosing, setIsClosing] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    
    // Refs for accessibility and focus management
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Navigation items with correct section mapping
    const navItems: NavItem[] = [
        { 
            id: 'about-me',
            label: t("navbar.1"),
            href: document.getElementById('about-me') ? '#about-me' : '/',
            targetId: 'about-me'
        },
        { 
            id: 'results',
            label: t("navbar.2"),
            href: '#results',
            targetId: 'results'
        },
        { 
            id: 'Enrollment',
            label: t("navbar.3"),
            href: '#Enrollment',
            targetId: 'Enrollment'
        },
        { 
            id: 'contact', 
            label: t("navbar.4"),
            href: '#contact',
            targetId: 'contact'
        }
    ];

    // Completely rewritten scroll handler with better logic
    useEffect(() => {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking && !isScrolling) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    setScrolled(scrollY > 20);

                    // Only update active section if we're not programmatically scrolling
                    if (!isScrolling) {
                        updateActiveSection();
                    }
                    
                    ticking = false;
                });
                ticking = true;
            }
        };

        const updateActiveSection = () => {
            const navbarHeight = 100;
            const scrollPosition = window.scrollY + navbarHeight;
            
            let newActiveSection = '';
            let bestMatch = null;
            let smallestDistance = Infinity;
            
            // Find the section that is most prominently in view
            navItems.forEach(item => {
                const element = document.getElementById(item.targetId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const elementTop = rect.top + window.scrollY;
                    const elementBottom = elementTop + rect.height;
                    const elementCenter = elementTop + (rect.height / 2);
                    
                    // Calculate distance from current scroll position to element center
                    const distance = Math.abs(scrollPosition - elementCenter);
                    
                    // Check if the element is significantly in view
                    const viewportTop = window.scrollY + navbarHeight;
                    const viewportBottom = window.scrollY + window.innerHeight;
                    
                    // Element is in view if any part of it is visible in the viewport
                    const isInView = elementTop < viewportBottom && elementBottom > viewportTop;
                    
                    // Calculate how much of the element is visible
                    const visibleTop = Math.max(elementTop, viewportTop);
                    const visibleBottom = Math.min(elementBottom, viewportBottom);
                    const visibleHeight = Math.max(0, visibleBottom - visibleTop);
                    const visibilityPercentage = rect.height > 0 ? (visibleHeight / rect.height) : 0;
                    
                    // Prefer elements that are more than 30% visible and closest to center
                    if (isInView && visibilityPercentage > 0.3 && distance < smallestDistance) {
                        smallestDistance = distance;
                        bestMatch = item.targetId;
                    }
                    
                    console.log(`Section ${item.targetId}: visibility=${(visibilityPercentage * 100).toFixed(1)}%, distance=${distance.toFixed(0)}, inView=${isInView}`);
                }
            });
            
            // Use the best match if found
            if (bestMatch) {
                newActiveSection = bestMatch;
            }
            
            // Special case for when we're at the very top
            if (window.scrollY < 100) {
                newActiveSection = '';
            }
            
            // Only update if there's a significant change
            if (newActiveSection !== activeSection) {
                console.log('Natural scroll - updating active section from', activeSection, 'to:', newActiveSection);
                setActiveSection(newActiveSection);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Initial check
        if (!isScrolling) {
            updateActiveSection();
        }
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, [navItems, activeSection, isScrolling]);

    // Enhanced body scroll management with better position preservation
    useEffect(() => {
        const body = document.body;
        const html = document.documentElement;
        
        if (isMenuOpen) {
            const scrollY = window.scrollY;
            // Store scroll position more reliably
            body.setAttribute('data-scroll-y', scrollY.toString());
            body.style.position = 'fixed';
            body.style.top = `-${scrollY}px`;
            body.style.width = '100%';
            body.style.overflow = 'hidden';
            html.style.overflow = 'hidden';
            
            const mainContent = document.querySelector('main') || document.querySelector('#root > *:not(header)');
            if (mainContent) {
                (mainContent as HTMLElement).style.filter = 'blur(3px)';
                (mainContent as HTMLElement).style.transition = 'filter 0.3s ease';
            }
        } else {
            // Restore scroll position more reliably
            const scrollY = body.getAttribute('data-scroll-y') || body.style.top;
            body.style.position = '';
            body.style.top = '';
            body.style.width = '';
            body.style.overflow = '';
            html.style.overflow = '';
            body.removeAttribute('data-scroll-y');
            
            // Only restore scroll if we have a position stored and we're not in the middle of a smooth scroll
            if (scrollY && !isScrolling) {
                const scrollValue = scrollY.includes('-') ? parseInt(scrollY.replace('-', '').replace('px', '')) : parseInt(scrollY);
                window.scrollTo(0, scrollValue);
            }
            
            const mainContent = document.querySelector('main') || document.querySelector('#root > *:not(header)');
            if (mainContent) {
                (mainContent as HTMLElement).style.filter = '';
            }
        }

        return () => {
            body.style.position = '';
            body.style.top = '';
            body.style.width = '';
            body.style.overflow = '';
            html.style.overflow = '';
            body.removeAttribute('data-scroll-y');
            
            const mainContent = document.querySelector('main') || document.querySelector('#root > *:not(header)');
            if (mainContent) {
                (mainContent as HTMLElement).style.filter = '';
            }
        };
    }, [isMenuOpen, isScrolling]); // Added isScrolling dependency

    // Close menu on window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 991 && isMenuOpen) {
                closeMenu();
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMenuOpen]);

    // Keyboard event handling
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!isMenuOpen) return;

            switch (event.key) {
                case 'Escape':
                    event.preventDefault();
                    closeMenu();
                    break;
                    
                case 'Tab':
                    if (mobileMenuRef.current) {
                        const focusableElements = mobileMenuRef.current.querySelectorAll(
                            'a, button, [tabindex]:not([tabindex="-1"])'
                        );
                        const firstElement = focusableElements[0] as HTMLElement;
                        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

                        if (event.shiftKey) {
                            if (document.activeElement === firstElement) {
                                event.preventDefault();
                                lastElement?.focus();
                            }
                        } else {
                            if (document.activeElement === lastElement) {
                                event.preventDefault();
                                firstElement?.focus();
                            }
                        }
                    }
                    break;
            }
        };

        if (isMenuOpen) {
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [isMenuOpen]);

    // Focus management when menu opens/closes
    useEffect(() => {
        if (isMenuOpen) {
            setTimeout(() => {
                const firstFocusable = mobileMenuRef.current?.querySelector(
                    'a, button, [tabindex]:not([tabindex="-1"])'
                ) as HTMLElement;
                firstFocusable?.focus();
            }, 100);
        } else if (!isClosing) {
            menuButtonRef.current?.focus();
        }
    }, [isMenuOpen, isClosing]);

    // Enhanced toggle menu function
    const toggleMenu = useCallback(() => {
        if (isMenuOpen) {
            closeMenu();
        } else {
            setIsMenuOpen(true);
            setIsClosing(false);
        }
    }, [isMenuOpen]);

    // Enhanced close menu function
    const closeMenu = useCallback(() => {
        setIsClosing(true);
        setIsMenuOpen(false);
        
        setTimeout(() => {
            setIsClosing(false);
        }, 400);
    }, []);

    // Enhanced click outside handler
    const handleOverlayClick = useCallback((e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeMenu();
        }
    }, [closeMenu]);

    // Completely rewritten smooth scroll with proper state management
    const handleSmoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        e.preventDefault();
        
        console.log('=== CLICK EVENT ===');
        console.log('Clicked link:', targetId);
        console.log('Current active section before click:', activeSection);
        
        // Immediately set the active section and prevent scroll updates
        setActiveSection(targetId);
        setIsScrolling(true);
        
        // Clear any existing scroll timeout
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }
        
        try {
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                console.log('Target element found, scrolling to:', targetElement);
                
                // Close mobile menu first if open
                if (isMenuOpen) {
                    // Store the current scroll position before closing menu
                    const currentScrollY = window.scrollY;
                    
                    closeMenu();
                    
                    // Wait for menu close animation and body scroll restoration
                    setTimeout(() => {
                        // Restore scroll position first
                        window.scrollTo(0, currentScrollY);
                        
                        // Then perform smooth scroll after a short delay
                        setTimeout(() => {
                            performScroll(targetElement, targetId);
                        }, 50);
                    }, 450); // Increased delay to ensure menu close completes
                } else {
                    performScroll(targetElement, targetId);
                }
            } else {
                console.warn(`Target element with ID "${targetId}" not found`);
                console.log('Available elements with IDs:', 
                    Array.from(document.querySelectorAll('[id]')).map(el => el.id)
                );
                
                // Try fallback
                const fallbackElement = document.querySelector(`section[id*="${targetId}"], div[id*="${targetId}"], .${targetId}`) as HTMLElement;
                if (fallbackElement) {
                    console.log('Found fallback element:', fallbackElement);
                    if (isMenuOpen) {
                        const currentScrollY = window.scrollY;
                        closeMenu();
                        setTimeout(() => {
                            window.scrollTo(0, currentScrollY);
                            setTimeout(() => {
                                performScroll(fallbackElement, targetId);
                            }, 50);
                        }, 450);
                    } else {
                        performScroll(fallbackElement, targetId);
                    }
                } else {
                    setIsScrolling(false);
                }
            }
        } catch (error) {
            console.error('Error during smooth scroll:', error);
            setIsScrolling(false);
            window.location.hash = `#${targetId}`;
        }
    }, [isMenuOpen, closeMenu, activeSection]);

    // Helper function to perform the actual scrolling
    const performScroll = (element: HTMLElement, targetId: string) => {
        const headerHeight = 100;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight;

        console.log('Scrolling to position:', offsetPosition);
        console.log('Setting active section to:', targetId);

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Keep the active section locked during scrolling
        setActiveSection(targetId);
        
        // Set a longer timeout to prevent scroll detection from overriding
        scrollTimeoutRef.current = setTimeout(() => {
            console.log('Scroll timeout completed, re-enabling scroll detection');
            setIsScrolling(false);
            // Double-check the active section one more time
            setActiveSection(targetId);
        }, 1500); // Increased timeout to ensure smooth scroll completes
    };

    // Enhanced language switching with error handling
    const switchLanguage = useCallback(async (lang: Language) => {
        try {
            await i18n.changeLanguage(lang);
            setCurrentLanguage(lang);
            localStorage.setItem('preferred-language', lang);
        } catch (error) {
            console.error('Error switching language:', error);
        }
    }, []);

    // Load preferred language on mount
    useEffect(() => {
        const savedLanguage = localStorage.getItem('preferred-language') as Language;
        if (savedLanguage && (savedLanguage === 'pt' || savedLanguage === 'en')) {
            setCurrentLanguage(savedLanguage);
            i18n.changeLanguage(savedLanguage);
        }
    }, []);

    // Debug effect to track active section changes
    useEffect(() => {
        console.log('Active section changed to:', activeSection);
    }, [activeSection]);

    return (
        <>
            <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`} role="banner">
                <div className="navbar-background-blur"></div>
                <div className="navbar-container">
                    {/* Logo */}
                    <div className="navbar-logo">
                        <a href="/" aria-label="SantiClinic Home">
                            <div className="logo-container">
                                <img src={logo} alt="Wilsa Santiago Logo"/>
                            </div>
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="desktop-links navbar-links" role="navigation" aria-label="Main navigation">
                        <ul>
                            {navItems.map(item => {
                                const isActive = activeSection === item.targetId;
                                console.log(`Link ${item.label}: activeSection=${activeSection}, targetId=${item.targetId}, isActive=${isActive}`);
                                
                                return (
                                    <li key={item.id}>
                                        <a 
                                            href={item.href}
                                            onClick={(e) => handleSmoothScroll(e, item.targetId)}
                                            className={isActive ? 'active' : ''}
                                            aria-current={isActive ? 'page' : undefined}
                                            aria-label={`Navigate to ${item.label} section`}
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Desktop Actions */}
                    <div className="desktop-actions navbar-actions">
                        <a 
                            href="https://wa.me/351915007427" 
                            className="contact-button"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Contact SantiClinic via WhatsApp (opens in new tab)"
                        >
                            <span className="cta-text">{t("navbar.btn") || "Contactar"}</span>
                            <div className="cta-glow"></div>
                        </a>
                        
                        <div className="language-selector" role="group" aria-label="Language selection">
                            <button
                                className={currentLanguage === 'pt' ? 'active' : ''}
                                onClick={() => switchLanguage('pt')}
                                aria-label="Switch to Portuguese"
                                aria-pressed={currentLanguage === 'pt'}
                                type="button"
                            >
                                <span>PT</span>
                                <img
                                    alt=""
                                    src="http://purecatamphetamine.github.io/country-flag-icons/3x2/PT.svg"
                                    role="presentation"
                                />
                            </button>
                            <span className="language-divider" aria-hidden="true">|</span>
                            <button
                                className={currentLanguage === 'en' ? 'active' : ''}
                                onClick={() => switchLanguage('en')}
                                aria-label="Switch to English"
                                aria-pressed={currentLanguage === 'en'}
                                type="button"
                            >
                                <span>EN</span>
                                <img
                                    alt=""
                                    src="http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg"
                                    role="presentation"
                                />
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        ref={menuButtonRef}
                        className={`mobile-menu-button ${isMenuOpen ? 'active' : ''}`}
                        onClick={toggleMenu}
                        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                        type="button"
                    >
                        <span className="hamburger-line" aria-hidden="true"></span>
                        <span className="hamburger-line" aria-hidden="true"></span>
                        <span className="hamburger-line" aria-hidden="true"></span>
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div 
                className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`}
                onClick={handleOverlayClick}
                aria-hidden={!isMenuOpen}
                role="presentation"
            ></div>

            {/* Mobile Menu */}
            <div 
                ref={mobileMenuRef}
                className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-labelledby="mobile-menu-title"
                aria-hidden={!isMenuOpen}
            >
                <div className="mobile-menu-container">
                    <div className="mobile-menu-header">
                        <div className="navbar-logo">
                            <a href="/" aria-label="SantiClinic Home">
                                <div className="logo-container">
                                    <img src={logo} alt="SantiClinic Logo" />
                                </div>
                            </a>
                        </div>
                        <button
                            className="mobile-menu-close"
                            onClick={closeMenu}
                            aria-label="Close navigation menu"
                            type="button"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>

                    <nav className="mobile-nav" role="navigation" aria-label="Mobile navigation">
                        <h2 id="mobile-menu-title" className="sr-only">Navigation Menu</h2>
                        <ul>
                            {navItems.map((item, index) => (
                                <li key={item.id} style={{ animationDelay: `${index * 0.1}s` }}>
                                    <a
                                        href={item.href}
                                        onClick={(e) => handleSmoothScroll(e, item.targetId)}
                                        className={activeSection === item.targetId ? 'active' : ''}
                                        aria-current={activeSection === item.targetId ? 'page' : undefined}
                                        aria-label={`Navigate to ${item.label} section`}
                                    >
                                        <span className="mobile-nav-icon" aria-hidden="true">
                                            <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                                                <circle cx="3" cy="3" r="3" fill="currentColor"/>
                                            </svg>
                                        </span>
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="mobile-actions">
                        <a 
                            href="https://wa.me/351915007427" 
                            className="mobile-contact-button"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Contact SantiClinic via WhatsApp (opens in new tab)"
                        >
                            <span className="cta-text">{t("navbar.btn") || "Contactar"}</span>
                            <div className="cta-glow"></div>
                        </a>
                        
                        <div className="mobile-language-selector" role="group" aria-label="Language selection">
                            <span className="language-label">Language:</span>
                            <div className="language-buttons">
                                <button
                                    className={currentLanguage === 'pt' ? 'active' : ''}
                                    onClick={() => switchLanguage('pt')}
                                    aria-label="Switch to Portuguese"
                                    aria-pressed={currentLanguage === 'pt'}
                                    type="button"
                                >
                                    <img
                                        alt=""
                                        src="http://purecatamphetamine.github.io/country-flag-icons/3x2/PT.svg"
                                        role="presentation"
                                    />
                                    <span>PT</span>
                                </button>
                                <button
                                    className={currentLanguage === 'en' ? 'active' : ''}
                                    onClick={() => switchLanguage('en')}
                                    aria-label="Switch to English"
                                    aria-pressed={currentLanguage === 'en'}
                                    type="button"
                                >
                                    <img
                                        alt=""
                                        src="http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg"
                                        role="presentation"
                                    />
                                    <span>EN</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Screen reader only styles */}
            <style>{`
                .sr-only {
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    padding: 0;
                    margin: -1px;
                    overflow: hidden;
                    clip: rect(0, 0, 0, 0);
                    white-space: nowrap;
                    border: 0;
                }
            `}</style>
        </>
    );
};

export default Navbar;