export default function HeroSection() {
  const handleViewWorkClick = () => {
    const galleryElement = document.getElementById("gallery");
    if (galleryElement) {
      galleryElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center">
      {/* Hero artwork backdrop */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
          alt="Detailed pencil drawing artwork"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-primary/40 z-10"></div>

      <div className="relative z-20 text-center text-white px-6 max-w-4xl mx-auto">
        <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
          Elena Martinez
        </h1>
        <p className="font-playfair text-xl md:text-2xl mb-4 italic">
          Hand Drawing Artist
        </p>
        <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Creating intimate connections through the timeless art of hand drawing,
          where every stroke tells a story and captures the essence of human emotion.
        </p>
        <div className="mt-12">
          <button
            onClick={handleViewWorkClick}
            className="inline-block bg-muted text-white px-8 py-3 hover:bg-primary transition-colors duration-300 rounded"
          >
            View My Work
          </button>
        </div>
      </div>
    </section>
  );
}
