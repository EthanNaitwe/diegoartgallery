import { useQuery } from "@tanstack/react-query";
import { Artwork } from "@shared/schema";
import { useState } from "react";

interface GallerySectionProps {
  onImageClick?: (artwork: Artwork) => void;
}

export default function GallerySection({ onImageClick }: GallerySectionProps) {
  const { data: artworks, isLoading, error } = useQuery<Artwork[]>({
    queryKey: ["/api/artworks"],
  });

  if (isLoading) {
    return (
      <section id="gallery" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
              Gallery
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted/30 h-96 rounded-lg mb-4"></div>
                <div className="bg-muted/30 h-4 rounded mb-2"></div>
                <div className="bg-muted/30 h-3 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="gallery" className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
            Gallery
          </h2>
          <p className="text-destructive">Failed to load artworks. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
            Gallery
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            A collection of hand-drawn artworks exploring themes of humanity, nature,
            and the delicate balance between light and shadow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks?.map((artwork) => (
            <div
              key={artwork.id}
              className="gallery-item cursor-pointer"
              onClick={() => onImageClick?.(artwork)}
            >
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="py-6">
                <h3 className="font-playfair text-xl font-semibold text-primary mb-2">
                  {artwork.title}
                </h3>
                <p className="text-muted">
                  {artwork.medium}, {artwork.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
