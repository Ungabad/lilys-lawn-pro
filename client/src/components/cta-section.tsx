export default function CTASection() {
  return (
    <section className="py-12 bg-primary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
            Ready for a Beautiful, Worry-Free Property?
          </h3>
          <p className="text-white opacity-90 max-w-2xl mx-auto mb-8">
            Join our growing list of satisfied customers and experience the
            Lily's Lawn & Snow Pro's difference.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="tel:+15095559876"
              className="bg-white text-primary px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition duration-200"
            >
              <i className="fas fa-phone-alt mr-2"></i>Call Now: (509) 555-9876
            </a>
            <a
              href="#contact"
              className="bg-accent text-dark px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition duration-200"
            >
              <i className="fas fa-clipboard-list mr-2"></i>Get a Free Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
