import { Eye, PenTool, Palette } from "lucide-react";

export default function AboutSection() {
  const processSteps = [
    {
      icon: Eye,
      title: "Curation",
      description: "Each artwork is carefully selected based on artistic merit, innovation, and emotional impact.",
    },
    {
      icon: PenTool,
      title: "Presentation",
      description: "We create thoughtful exhibitions that highlight the unique voice of each artist.",
    },
    {
      icon: Palette,
      title: "Community",
      description: "Building connections between artists, collectors, and art enthusiasts through meaningful dialogue.",
    },
  ];

  return (
    <section id="about" className="py-24 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-8">
              About Diego Art Gallery
            </h2>
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                Diego Art Gallery is a contemporary art space dedicated to showcasing exceptional
                artwork from both emerging and established artists. Our mission is to bridge the
                gap between traditional artistic techniques and modern creative expression,
                creating a platform where diverse artistic voices can flourish.
              </p>
              <p>
                Founded with a passion for supporting the arts community, our gallery features
                carefully curated exhibitions that span various mediums including paintings,
                drawings, sculptures, and mixed media works. We believe in the power of art to
                inspire, provoke thought, and bring people together.
              </p>
              <p>
                Our space serves as both a gallery and a cultural hub, hosting artist talks,
                workshops, and community events. We are committed to making art accessible to
                everyone while maintaining the highest standards of artistic excellence.
              </p>
            </div>

            <div className="mt-12">
              <h3 className="font-playfair text-2xl font-semibold text-primary mb-6">
                Our Approach
              </h3>
              <div className="space-y-4">
                {processSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <step.icon className="text-muted mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-primary">{step.title}</h4>
                      <p className="text-muted">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <img
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Art gallery exhibition space"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1572217433203-63c4fa44fe2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Contemporary artwork display in gallery"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
