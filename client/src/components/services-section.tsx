import { useState } from "react";

const lawnServices = [
  {
    icon: "fas fa-cut",
    title: "Lawn Mowing",
    description:
      "Professional lawn mowing services with precise edging and trimming for a manicured look.",
    features: [
      "Weekly or bi-weekly schedules",
      "Precise edging and trimming",
      "Clean-up included",
    ],
  },
  {
    icon: "fas fa-seedling",
    title: "Lawn Fertilization",
    description:
      "Custom fertilization programs to keep your lawn lush, green, and healthy all season long.",
    features: [
      "Custom fertilization programs",
      "Weed control treatments",
      "Soil testing available",
    ],
  },
  {
    icon: "fas fa-leaf",
    title: "Spring/Fall Cleanup",
    description:
      "Comprehensive seasonal cleanup services to prepare your lawn for the growing or dormant season.",
    features: ["Leaf removal", "Debris clearing", "Bed maintenance"],
  },
  {
    icon: "fas fa-water",
    title: "Irrigation Services",
    description:
      "Professional irrigation system installation, maintenance, and repair to keep your lawn properly watered.",
    features: [
      "System installation",
      "Seasonal maintenance",
      "Repair services",
    ],
  },
  {
    icon: "fas fa-tree",
    title: "Landscaping",
    description:
      "Transform your outdoor space with our professional landscaping design and installation services.",
    features: [
      "Landscape design",
      "Plant installation",
      "Hardscaping elements",
    ],
  },
  {
    icon: "fas fa-fill-drip",
    title: "Aeration & Overseeding",
    description:
      "Promote healthy root growth and thicker grass with our aeration and overseeding services.",
    features: ["Core aeration", "Premium grass seed", "Improved soil health"],
  },
];

const snowServices = [
  {
    icon: "fas fa-snowplow",
    title: "Snow Plowing",
    description:
      "Professional snow plowing for driveways, parking lots, and roadways to keep them clear and accessible.",
    features: [
      "Residential driveways",
      "Commercial parking lots",
      "Prompt storm response",
    ],
  },
  {
    icon: "fas fa-icicles",
    title: "Ice Management",
    description:
      "Prevent slips and falls with our professional ice management and de-icing services.",
    features: [
      "Ice melt application",
      "Pre-storm treatments",
      "Sidewalk and entryway clearing",
    ],
  },
  {
    icon: "fas fa-snowflake",
    title: "Seasonal Contracts",
    description:
      "Secure reliable snow removal for the entire season with our seasonal contract options.",
    features: [
      "Priority service",
      "Consistent pricing",
      "Customized snow plans",
    ],
  },
  {
    icon: "fas fa-hand-sparkles",
    title: "Hand Shoveling",
    description:
      "Detailed snow removal for walkways, steps, and tight spaces that require manual clearing.",
    features: [
      "Walkways and sidewalks",
      "Steps and porches",
      "Careful clearing around obstacles",
    ],
  },
  {
    icon: "fas fa-building",
    title: "Commercial Services",
    description:
      "Comprehensive snow removal solutions for businesses, ensuring safe access for employees and customers.",
    features: [
      "Parking lot clearing",
      "Entrance and exit maintenance",
      "24/7 emergency service",
    ],
  },
  {
    icon: "fas fa-home",
    title: "Residential Snow Removal",
    description:
      "Keep your home accessible and safe during winter months with our residential snow removal services.",
    features: [
      "Driveway clearing",
      "Walkway shoveling",
      "Roof snow removal available",
    ],
  },
];

export default function ServicesSection() {
  const [showSnow, setShowSnow] = useState(false);

  return (
    <section id='services' className='py-16 bg-[#707c72]'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='text-center mb-12'>
          <h3 className='text-3xl font-heading font-bold text-primary mb-4'>
            Our Services
          </h3>
          <p className='max-w-2xl mx-auto text-dark'>
            We offer comprehensive lawn care and snow removal services to keep
            your property looking its best throughout every season.
          </p>

          {/* Service Toggle */}
          <div className='flex justify-center mt-8'>
            <div className='relative inline-block w-64'>
              <input
                type='checkbox'
                id='service-toggle'
                className='absolute opacity-0 w-0 h-0'
                checked={showSnow}
                onChange={() => setShowSnow(!showSnow)}
              />
              <label htmlFor='service-toggle' className='flex cursor-pointer'>
                <span
                  className={`flex-1 py-2 text-center font-medium ${
                    showSnow ? "text-primary" : "text-green-500"
                  }`}
                >
                  Lawn Services
                </span>
                <div className='relative mx-2'>
                  <div
                    className={`w-14 h-7 rounded-full transition-colors duration-200 ease-in-out ${
                      showSnow ? "bg-primary" : "bg-secondary"
                    }`}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 bg-black w-5 h-5 rounded-full transition-transform duration-200 ease-in-out ${
                      showSnow ? "transform translate-x-7" : ""
                    }`}
                  ></div>
                </div>
                <span
                  className={`flex-1 py-2 text-center font-medium ${
                    showSnow ? "text-green-500" : "text-primary"
                  }`}
                >
                  Snow Services
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Lawn Services */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${
            showSnow ? "hidden" : ""
          }`}
        >
          {lawnServices.map((service, index) => (
            <div
              key={`lawn-${index}`}
              className='bg-light rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200'
            >
              <div className='w-16 h-16 bg-secondary bg-opacity-20 rounded-full flex items-center justify-center mb-4'>
                <i className={`${service.icon} text-primary text-2xl`}></i>
              </div>
              <h4 className='text-xl font-heading font-bold mb-2'>
                {service.title}
              </h4>
              <p className='text-dark mb-4'>{service.description}</p>
              <ul className='text-sm space-y-1 mb-4'>
                {service.features.map((feature, featureIndex) => (
                  <li
                    key={`lawn-feature-${index}-${featureIndex}`}
                    className='flex items-start'
                  >
                    <i className='fas fa-check text-secondary mt-1 mr-2'></i>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Snow Services */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${
            showSnow ? "" : "hidden"
          }`}
        >
          {snowServices.map((service, index) => (
            <div
              key={`snow-${index}`}
              className='bg-light rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200'
            >
              <div className='w-16 h-16 bg-secondary bg-opacity-20 rounded-full flex items-center justify-center mb-4'>
                <i className={`${service.icon} text-primary text-2xl`}></i>
              </div>
              <h4 className='text-xl font-heading font-bold mb-2'>
                {service.title}
              </h4>
              <p className='text-dark mb-4'>{service.description}</p>
              <ul className='text-sm space-y-1 mb-4'>
                {service.features.map((feature, featureIndex) => (
                  <li
                    key={`snow-feature-${index}-${featureIndex}`}
                    className='flex items-start'
                  >
                    <i className='fas fa-check text-secondary mt-1 mr-2'></i>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className='text-center mt-10'>
          <a
            href='#contact'
            className='inline-block bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition duration-200'
          >
            Request a Service Quote
          </a>
        </div>
      </div>
    </section>
  );
}
