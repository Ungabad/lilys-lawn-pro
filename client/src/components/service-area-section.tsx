export default function ServiceAreaSection() {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2">
            <h3 className="text-3xl font-heading font-bold mb-4">
              Our Service Area
            </h3>
            <p className="mb-6">
              We proudly serve Spokane and the surrounding communities with our
              professional lawn care and snow removal services.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold text-lg mb-2">Spokane County</h4>
                <ul className="space-y-1">
                  <li className="flex items-center">
                    <i className="fas fa-map-marker-alt mr-2 text-accent"></i>
                    <span>Spokane</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-map-marker-alt mr-2 text-accent"></i>
                    <span>Spokane Valley</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-map-marker-alt mr-2 text-accent"></i>
                    <span>Liberty Lake</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-map-marker-alt mr-2 text-accent"></i>
                    <span>Mead</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-map-marker-alt mr-2 text-accent"></i>
                    <span>Cheney</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2">Surrounding Areas</h4>
                <ul className="space-y-1">
                  <li className="flex items-center">
                    <i className="fas fa-map-marker-alt mr-2 text-accent"></i>
                    <span>Deer Park</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-map-marker-alt mr-2 text-accent"></i>
                    <span>Airway Heights</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-map-marker-alt mr-2 text-accent"></i>
                    <span>Medical Lake</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-map-marker-alt mr-2 text-accent"></i>
                    <span>Nine Mile Falls</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-map-marker-alt mr-2 text-accent"></i>
                    <span>Other areas (please inquire)</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="mt-6">
              Not sure if we service your area? Contact us today to find out!
            </p>
            <a
              href="#contact"
              className="inline-block mt-4 bg-accent text-dark px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition duration-200"
            >
              Contact Us
            </a>
          </div>
          <div className="lg:w-1/2">
            <div className="bg-white p-2 rounded-lg shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d346054.5324368854!2d-117.5717799!3d47.6588603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5361012dd205735f%3A0x5f6b9fbeaf7ff747!2sSpokane%2C%20WA!5e0!3m2!1sen!2sus!4v1689356698037!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lily's Lawn & Snow Pro's LLC Service Area Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
