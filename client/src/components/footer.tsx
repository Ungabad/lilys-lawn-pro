export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <svg
                viewBox="0 0 24 24"
                className="h-12 w-12 rounded-full mr-2 bg-[#2F5233] text-white p-2"
              >
                <path
                  fill="currentColor"
                  d="M12,3C16.97,3 21,7.03 21,12C21,16.97 16.97,21 12,21C7.03,21 3,16.97 3,12C3,7.03 7.03,3 12,3M15.94,19.5H17.94C16.73,18.77 16,17.5 16,16A5,5 0 0,0 11,11A5,5 0 0,0 7.22,13.5H9.22C10.08,12.6 10.97,12 12,12C14.21,12 16,13.79 16,16C16,17.53 15.12,18.83 14,19.5H15.94Z"
                />
              </svg>
              <div>
                <h5 className="text-lg font-heading font-bold">
                  Lily's Lawn & Snow Pro's
                </h5>
                <p className="text-xs text-gray-400">
                  Spokane's Trusted Lawn Care Experts
                </p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Family-owned business providing quality lawn care and snow removal
              services to Spokane and surrounding areas.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                <i className="fab fa-nextdoor"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-200"
              >
                <i className="fab fa-google"></i>
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-lg font-heading font-bold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-heading font-bold mb-4">Services</h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Lawn Mowing
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Fertilization
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Landscaping
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Irrigation
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Snow Removal
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  Seasonal Cleanup
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-heading font-bold mb-4">Contact Us</h5>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-phone-alt mt-1 mr-3 text-gray-400"></i>
                <span>(509) 555-9876</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-3 text-gray-400"></i>
                <span>info@lilyslawnandsnow.com</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-gray-400"></i>
                <span>Spokane, WA and surrounding areas</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-clock mt-1 mr-3 text-gray-400"></i>
                <span>
                  Mon-Fri: 7am-7pm
                  <br />
                  Sat: 8am-5pm
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Lily's Lawn & Snow Pro's LLC. All rights reserved.
          </p>
          <div className="mt-2 text-xs text-gray-500 flex justify-center flex-wrap gap-4">
            <a href="#" className="hover:text-gray-400">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-400">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gray-400">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
