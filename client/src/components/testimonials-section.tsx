import { useState, useRef, useEffect } from "react";

const testimonials = [
  {
    text: "Extremely professional nice to see dads showing their kids the tricks of the trade! Keep it up! Highly recommend!!!! Will hire again",
    name: "Drayven M.",
    initials: "DM",
  },
  {
    text: "Customer services is very professional always willing to help and does above and beyond what is expected of their services. Would hire them again in the future.",
    name: "Adam B",
    initials: "AB",
  },
  {
    text: "The landscaping project Lily's completed for us completely transformed our yard. They listened to what we wanted and delivered beyond our expectations. Very reasonable prices for the quality of work they provide.",
    name: "Robert L.",
    location: "Liberty Lake",
    initials: "RL",
  },
  {
    text: "Great team! Very professional gets the job done right. Thank you.",
    name: "Michelle A.",
    initials: "MA",
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollToTestimonial = (index: number) => {
    if (sliderRef.current && sliderRef.current.children[index]) {
      sliderRef.current.scrollTo({
        left:
          (sliderRef.current.children[index] as HTMLElement).offsetLeft -
          sliderRef.current.offsetLeft,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  const nextTestimonial = () => {
    const newIndex =
      activeIndex < testimonials.length - 1 ? activeIndex + 1 : 0;
    scrollToTestimonial(newIndex);
  };

  const prevTestimonial = () => {
    const newIndex =
      activeIndex > 0 ? activeIndex - 1 : testimonials.length - 1;
    scrollToTestimonial(newIndex);
  };

  // Handle scroll snap end to update active index
  useEffect(() => {
    const handleScroll = () => {
      if (sliderRef.current) {
        const scrollLeft = sliderRef.current.scrollLeft;
        const slideWidth = sliderRef.current.offsetWidth;
        const newIndex = Math.round(scrollLeft / slideWidth);

        if (newIndex !== activeIndex && newIndex < testimonials.length) {
          setActiveIndex(newIndex);
        }
      }
    };

    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scrollend", handleScroll);
    }

    return () => {
      if (slider) {
        slider.removeEventListener("scrollend", handleScroll);
      }
    };
  }, [activeIndex]);

  return (
    <section id='testimonials' className='py-16 bg-white'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='text-center mb-12'>
          <h3 className='text-3xl font-heading font-bold text-primary mb-4'>
            What Our Customers Say
          </h3>
          <p className='max-w-2xl mx-auto text-dark'>
            We're proud of the positive feedback we receive from our satisfied
            customers.
          </p>
        </div>

        <div className='relative'>
          <div
            ref={sliderRef}
            className='testimonial-slider flex overflow-x-auto pb-8 -mx-4 px-4 hide-scrollbar snap-x snap-mandatory'
            style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth" }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={`testimonial-${index}`}
                className='flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4 snap-start'
                style={{ scrollSnapAlign: "start" }}
              >
                <div className='bg-light rounded-lg shadow-md p-6 h-full'>
                  <div className='flex items-center mb-4'>
                    <div className='text-yellow-500'>
                      <i className='fas fa-star'></i>
                      <i className='fas fa-star'></i>
                      <i className='fas fa-star'></i>
                      <i className='fas fa-star'></i>
                      <i className='fas fa-star'></i>
                    </div>
                    <span className='ml-2 text-sm font-medium'>5.0</span>
                  </div>
                  <p className='text-dark mb-6 italic'>"{testimonial.text}"</p>
                  <div className='flex items-center'>
                    <div className='w-10 h-10 bg-secondary bg-opacity-20 rounded-full flex items-center justify-center text-primary font-bold'>
                      {testimonial.initials}
                    </div>
                    <div className='ml-3'>
                      <h5 className='font-medium'>{testimonial.name}</h5>
                      <p className='text-sm text-secondary'>
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='absolute top-1/2 left-0 transform -translate-y-1/2 text-primary z-10 hidden md:block'>
            <button
              onClick={prevTestimonial}
              className='bg-white p-2 rounded-full shadow-md hover:bg-light transition duration-200'
            >
              <i className='fas fa-chevron-left text-xl'></i>
            </button>
          </div>
          <div className='absolute top-1/2 right-0 transform -translate-y-1/2 text-primary z-10 hidden md:block'>
            <button
              onClick={nextTestimonial}
              className='bg-white p-2 rounded-full shadow-md hover:bg-light transition duration-200'
            >
              <i className='fas fa-chevron-right text-xl'></i>
            </button>
          </div>
        </div>

        <div className='flex justify-center mt-6 md:hidden'>
          <div className='space-x-2'>
            {testimonials.map((_, index) => (
              <button
                key={`dot-${index}`}
                onClick={() => scrollToTestimonial(index)}
                className={`w-3 h-3 rounded-full bg-secondary focus:outline-none ${
                  activeIndex === index ? "opacity-100" : "opacity-50"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
