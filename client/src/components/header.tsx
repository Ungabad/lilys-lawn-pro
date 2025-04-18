import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import logo from "../images/logo.png";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [location, setLocation] = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/user");
        if (res.ok) {
          const user = await res.json();
          setIsAuthenticated(true);
          setIsAdmin(user.isAdmin || false);
        } else {
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    };

    checkAuth();
  }, [location]); // Re-check when location changes

  return (
    <header className='bg-[#707c72] shadow-md sticky top-0 z-50'>
      <div className='container mx-auto px-4 md:px-6 py-3'>
        <div className='flex justify-between items-center'>
          {/* Logo */}
          <div className='flex items-center'>
            <img
              src={logo}
              alt="Lily's Lawn & Snow Pro's Logo"
              className='h-10 md:h-12 mr-3'
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className='md:hidden text-dark focus:outline-none'
          >
            <i className='fas fa-bars text-xl'></i>
          </button>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex space-x-4 items-center'>
            <a
              href='#home'
              className='font-medium hover:text-primary transition duration-200'
            >
              Home
            </a>
            <a
              href='#services'
              className='font-medium hover:text-primary transition duration-200'
            >
              Services
            </a>
            <a
              href='#gallery'
              className='font-medium hover:text-primary transition duration-200'
            >
              Gallery
            </a>
            <a
              href='#testimonials'
              className='font-medium hover:text-primary transition duration-200'
            >
              Testimonials
            </a>
            <a
              href='#contact'
              className='font-medium hover:text-primary transition duration-200'
            >
              Contact
            </a>

            {/* Admin button or login link
            {isAuthenticated && isAdmin ? (
              <a
                href='/admin'
                className='font-medium text-secondary hover:text-primary transition duration-200 border-l pl-4 ml-2'
              >
                <i className='fas fa-user-shield mr-1'></i>
                Dashboard
              </a>
            ) : (
              <a
                href='/auth'
                className='font-medium text-secondary hover:text-primary transition duration-200 border-l pl-4 ml-2'
              >
                <i className='fas fa-user-lock mr-1'></i>
                Admin Login
              </a>
            )} */}

            <a
              href='tel:+15096179194'
              className='bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition duration-200'
            >
              <i className='fas fa-phone-alt mr-2'></i>Call Now
            </a>
          </nav>
        </div>

        {/* Mobile Navigation */}
        <nav
          className={`md:hidden mt-4 pb-2 ${mobileMenuOpen ? "" : "hidden"}`}
        >
          <div className='flex flex-col space-y-3'>
            <a
              href='#home'
              className='font-medium hover:text-primary transition duration-200'
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href='#services'
              className='font-medium hover:text-primary transition duration-200'
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </a>
            <a
              href='#gallery'
              className='font-medium hover:text-primary transition duration-200'
              onClick={() => setMobileMenuOpen(false)}
            >
              Gallery
            </a>
            <a
              href='#testimonials'
              className='font-medium hover:text-primary transition duration-200'
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <a
              href='#contact'
              className='font-medium hover:text-primary transition duration-200'
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>

            {/* Admin button or login link - mobile
            {isAuthenticated && isAdmin ? (
              <a
                href='/admin'
                className='font-medium text-secondary hover:text-primary transition duration-200 border-t border-gray-200 pt-2 mt-1'
                onClick={() => setMobileMenuOpen(false)}
              >
                <i className='fas fa-user-shield mr-1'></i>
                Dashboard
              </a>
            ) : (
              <a
                href='/auth'
                className='font-medium text-secondary hover:text-primary transition duration-200 border-t border-gray-200 pt-2 mt-1'
                onClick={() => setMobileMenuOpen(false)}
              >
                <i className='fas fa-user-lock mr-1'></i>
                Admin Login
              </a>
            )} */}

            <a
              href='tel:+15096179194'
              className='bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition duration-200 inline-block text-center'
            >
              <i className='fas fa-phone-alt mr-2'></i>Call Now
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
