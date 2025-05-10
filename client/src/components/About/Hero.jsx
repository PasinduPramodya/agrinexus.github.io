import HeroImage from '../../assets/About/Hero.jpg';

const FarmTechHero = () => {
  return (
    <div className="relative h-96 overflow-hidden">
      {/* Hero Image Background with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={HeroImage} 
          alt="FarmTech sustainable agriculture" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-800 bg-opacity-30"></div>
      </div>
      
      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-center max-w-7xl mx-auto px-4 z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">
          About FarmTech
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl">
          Leading the way in sustainable agricultural innovation
        </p>
        <div className="space-x-4">
          <button className="bg-white text-green-800 px-6 py-2 rounded-md font-medium hover:bg-opacity-90 transition-all duration-300">
            Our Mission
          </button>
          <button className="border-2 border-white text-white px-6 py-2 rounded-md font-medium hover:bg-white hover:bg-opacity-20 transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>
      
      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-900 to-transparent"></div>
    </div>
  );
};

export default FarmTechHero;