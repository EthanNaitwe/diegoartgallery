import { Eye, PenTool, Palette } from "lucide-react";

export default function AboutSection() {
  const processSteps = [
    {
      icon: Eye,
      title: "Observation",
      description: "Every piece begins with careful observation and study of light, form, and shadow.",
    },
    {
      icon: PenTool,
      title: "Sketching",
      description: "Initial compositions are developed through multiple preliminary sketches.",
    },
    {
      icon: Palette,
      title: "Refinement",
      description: "The final work emerges through layers of detail and careful attention to texture.",
    },
  ];

  return (
    <section id="about" className="py-24 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-8">
              About Elena
            </h2>
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                Elena Martinez is a contemporary hand drawing artist whose work explores the
                intersection of traditional techniques and modern sensibilities. With over a
                decade of experience, she has developed a distinctive style that captures both
                the precision of classical draftsmanship and the emotional depth of contemporary
                expression.
              </p>
              <p>
                Her artistic journey began at the Academy of Fine Arts, where she studied under
                master draftsmen who emphasized the importance of observation and technical skill.
                This foundation has allowed her to create works that are both technically
                accomplished and emotionally resonant.
              </p>
              <p>
                Elena's work has been exhibited in galleries across the country and is held in
                private collections worldwide. She believes that in our digital age, the tactile
                nature of hand drawing offers a unique intimacy that connects the artist directly
                with the viewer.
              </p>
            </div>

            <div className="mt-12">
              <h3 className="font-playfair text-2xl font-semibold text-primary mb-6">
                My Process
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
              src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Artist workspace with drawing materials"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Professional portrait of Elena Martinez"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
