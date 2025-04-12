import logo from "../images/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-green-950 text-white pt-12 pb-6'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
          <div>
            <div className='flex items-center mb-4'>
              <img
                src={logo}
                alt="Lily's Lawn & Snow Pro's Logo"
                className='h-10 md:h-12 mr-3'
              />
              <div>
                <h5 className='text-lg font-heading font-bold'>
                  Lily's Lawn & Snow Pro's
                </h5>
                <p className='text-xs text-gray-400'>
                  Spokane's Trusted Lawn Care Experts
                </p>
              </div>
            </div>
            <p className='text-gray-400 mb-4'>
              Family-owned business providing quality lawn care and snow removal
              services to Spokane and surrounding areas.
            </p>
            {/* <div className='flex space-x-4'>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition duration-200'
              >
                <i className='fab fa-facebook-f'></i>
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition duration-200'
              >
                <i className='fab fa-instagram'></i>
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition duration-200'
              >
                <i className='fab fa-nextdoor'></i>
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition duration-200'
              >
                <i className='fab fa-google'></i>
              </a>
            </div> */}
          </div>

          <div>
            <h5 className='text-lg font-heading font-bold mb-4'>Quick Links</h5>
            <ul className='space-y-2'>
              <li>
                <a
                  href='#home'
                  className='text-gray-400 hover:text-white transition duration-200'
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href='#services'
                  className='text-gray-400 hover:text-white transition duration-200'
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href='#gallery'
                  className='text-gray-400 hover:text-white transition duration-200'
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href='#testimonials'
                  className='text-gray-400 hover:text-white transition duration-200'
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href='#contact'
                  className='text-gray-400 hover:text-white transition duration-200'
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className='text-lg font-heading font-bold mb-4'>Services</h5>
            <ul className='space-y-2'>
              <li>
                <a
                  href='#services'
                  className='text-gray-400 hover:text-white transition duration-200'
                >
                  Lawn Mowing
                </a>
              </li>
              <li>
                <a
                  href='#services'
                  className='text-gray-400 hover:text-white transition duration-200'
                >
                  Fertilization
                </a>
              </li>
              <li>
                <a
                  href='#services'
                  className='text-gray-400 hover:text-white transition duration-200'
                >
                  Landscaping
                </a>
              </li>
              <li>
                <a
                  href='#services'
                  className='text-gray-400 hover:text-white transition duration-200'
                >
                  Irrigation
                </a>
              </li>
              <li>
                <a
                  href='#services'
                  className='text-gray-400 hover:text-white transition duration-200'
                >
                  Snow Removal
                </a>
              </li>
              <li>
                <a
                  href='#services'
                  className='text-gray-400 hover:text-white transition duration-200'
                >
                  Seasonal Cleanup
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className='text-lg font-heading font-bold mb-4'>Contact Us</h5>
            <ul className='space-y-3'>
              <li className='flex items-start'>
                <i className='fas fa-phone-alt mt-1 mr-3 text-gray-400'></i>
                <span>(509) 617-9194</span>
              </li>
              <li className='flex items-start'>
                <i className='fas fa-envelope mt-1 mr-3 text-gray-400'></i>
                <span>lilyslawn.snowpros@gmail.com</span>
              </li>
              <li className='flex items-start'>
                <i className='fas fa-map-marker-alt mt-1 mr-3 text-gray-400'></i>
                <span>Spokane, WA and surrounding areas</span>
              </li>
              <li className='flex items-start'>
                <i className='fas fa-clock mt-1 mr-3 text-gray-400'></i>
                <span>
                  Mon-Fri: 7am-7pm
                  <br />
                  Sat: 8am-5pm
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className='pt-8 border-t border-gray-700 text-center'>
          <p className='text-gray-400 text-sm'>
            &copy; {currentYear} Lily's Lawn & Snow Pro's LLC. All rights
            reserved.
          </p>
          <div className='mt-2 text-xs text-gray-500 flex justify-center flex-wrap gap-4'>
            <a href='/privacy-policy' className='hover:text-gray-400'>
              Privacy Policy
            </a>
            <a href='/terms-of-service' className='hover:text-gray-400'>
              Terms of Service
            </a>
            <a href='/sitemap.xml' className='hover:text-gray-400'>
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
