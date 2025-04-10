import { Link } from "wouter";

export default function HeroBanner() {
  return (
    <section id="home" className="relative">
      <div
        className="relative h-[500px] md:h-[600px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1589923188900-85dae523342b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-dark bg-opacity-50"></div>
        <div className="container mx-auto px-4 md:px-6 h-full flex items-center relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight">
              Professional{" "}
              <span className="text-accent">Lawn Care</span> &{" "}
              <span className="text-accent">Snow Removal</span> Services
            </h2>
            <p className="mt-4 text-lg md:text-xl text-white font-light">
              Family-owned business serving Spokane and surrounding areas with
              quality service guaranteed.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="bg-accent text-dark px-6 py-3 rounded-md font-medium text-center hover:bg-opacity-90 transition duration-200"
              >
                Get a Free Quote
              </a>
              <a
                href="#services"
                className="bg-white text-primary px-6 py-3 rounded-md font-medium text-center hover:bg-opacity-90 transition duration-200"
              >
                Our Services
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary text-white py-4">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <i className="fas fa-check-circle text-accent text-2xl mr-3"></i>
              <span className="font-medium">Licensed & Insured</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-star text-accent text-2xl mr-3"></i>
              <span className="font-medium">5-Star Google Rated</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-clock text-accent text-2xl mr-3"></i>
              <span className="font-medium">Prompt & Reliable Service</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-home text-accent text-2xl mr-3"></i>
              <span className="font-medium">Family Owned & Operated</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
