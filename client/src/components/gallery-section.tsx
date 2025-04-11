const galleryImages = [
  {
    image:
      "https://images.unsplash.com/photo-1558904541-efa843a96f01?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80",
    title: "Lawn Mowing & Edging",
    location: "Residential property in Spokane Valley",
  },
  {
    image:
      "https://media.istockphoto.com/id/92624397/photo/summer-garden.jpg?s=612x612&w=0&k=20&c=RbSGqEXYyJZ5uIlIT39d0LyrPpJTEmFpYQypPj8_8Nk=",
    title: "Landscape Design",
    location: "Custom garden installation in Liberty Lake",
  },
  {
    image:
      "https://media.istockphoto.com/id/2155972411/photo/truck-with-snowplow-in-front-of-snow-pile.jpg?s=612x612&w=0&k=20&c=ICu-51JkkfVFrOi0-WXSpA6sZJbEaVH2yQbj9OnDTbM=",
    title: "Commercial Snow Removal",
    location: "Business parking lot in North Spokane",
  },
  {
    image:
      "https://media.gettyimages.com/id/157329039/photo/lawn-weed-and-feed.jpg?s=612x612&w=0&k=20&c=M12XlTIJsaSM1nbmtP0RvO8RgmvkmKEaoSIXa1DBn28=",
    title: "Lawn Fertilization",
    location: "Residential lawn treatment in Mead",
  },
  {
    image:
      "https://st3.depositphotos.com/1004423/37021/i/450/depositphotos_370217824-stock-photo-irrigation-system-watering-green-grass.jpg",
    title: "Irrigation System",
    location: "Custom installation in South Hill",
  },
  {
    image:
      "https://img.freepik.com/free-photo/people-operating-heavy-duty-leaf-blower_1153-7263.jpg?semt=ais_hybrid&w=740",
    title: "Fall Cleanup",
    location: "Property maintenance in Cheney",
  },
];

export default function GallerySection() {
  return (
    <section id='gallery' className='py-16 bg-light'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='text-center mb-12'>
          <h3 className='text-3xl font-heading font-bold text-primary mb-4'>
            Our Work
          </h3>
          <p className='max-w-2xl mx-auto text-dark'>
            Take a look at some of our recent projects and see the quality of
            our work firsthand.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {galleryImages.map((item, index) => (
            <div
              key={`gallery-${index}`}
              className='group relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-200'
            >
              <img
                src={item.image}
                alt={item.title}
                className='w-full h-64 object-cover'
              />
              <div className='absolute inset-0 bg-primary bg-opacity-0 group-hover:bg-opacity-75 flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100'>
                <div className='text-white text-center p-4'>
                  <h4 className='font-heading font-bold text-lg'>
                    {item.title}
                  </h4>
                  <p className='text-sm'>{item.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
