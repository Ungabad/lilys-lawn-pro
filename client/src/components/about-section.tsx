export default function AboutSection() {
  return (
    <section className="py-16 bg-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1621469278795-b5ea00a0a347?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=450&q=80"
              alt="Family-owned lawn care business"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-3xl font-heading font-bold text-primary mb-4">
              About Lily's Lawn & Snow Pro's
            </h3>
            <p className="mb-4 text-dark">
              Welcome to Lily's Lawn & Snow Pro's LLC, Spokane's trusted
              provider of professional lawn care and snow removal services. As a
              family-owned and operated business, we take pride in delivering
              exceptional service to our community.
            </p>
            <p className="mb-6 text-dark">
              Since our founding, we've been committed to maintaining the
              highest standards of quality and customer satisfaction. Our team of
              experienced professionals is dedicated to keeping your property
              looking its best year-round.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start">
                <i className="fas fa-leaf text-secondary text-xl mt-1 mr-3"></i>
                <div>
                  <h4 className="font-bold">Eco-Friendly</h4>
                  <p className="text-sm">Sustainable lawn care practices</p>
                </div>
              </div>
              <div className="flex items-start">
                <i className="fas fa-calendar-check text-secondary text-xl mt-1 mr-3"></i>
                <div>
                  <h4 className="font-bold">Reliable</h4>
                  <p className="text-sm">On-time service you can count on</p>
                </div>
              </div>
              <div className="flex items-start">
                <i className="fas fa-smile text-secondary text-xl mt-1 mr-3"></i>
                <div>
                  <h4 className="font-bold">Satisfaction</h4>
                  <p className="text-sm">100% customer satisfaction guarantee</p>
                </div>
              </div>
              <div className="flex items-start">
                <i className="fas fa-map-marker-alt text-secondary text-xl mt-1 mr-3"></i>
                <div>
                  <h4 className="font-bold">Local</h4>
                  <p className="text-sm">Proudly serving the Spokane area</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
