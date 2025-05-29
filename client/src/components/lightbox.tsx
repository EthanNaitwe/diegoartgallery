import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Artwork } from "@shared/schema";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface LightboxProps {
  artwork?: Artwork;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Lightbox({ artwork, isOpen = false, onClose }: LightboxProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  useEffect(() => {
    const handleImageClick = (event: Event) => {
      const target = event.target as HTMLElement;
      const galleryItem = target.closest('.gallery-item');
      
      if (galleryItem) {
        const img = galleryItem.querySelector('img');
        const title = galleryItem.querySelector('h3')?.textContent;
        const medium = galleryItem.querySelector('p')?.textContent;
        
        if (img && title && medium) {
          setSelectedArtwork({
            id: 0,
            title,
            medium: medium.replace(', 2024', '').replace(', 2023', ''),
            year: medium.includes('2024') ? 2024 : 2023,
            imageUrl: img.src,
            description: `${title} - ${medium}`,
            featured: false
          });
          setInternalOpen(true);
        }
      }
    };

    document.addEventListener('click', handleImageClick);
    return () => document.removeEventListener('click', handleImageClick);
  }, []);

  const currentArtwork = artwork || selectedArtwork;
  const isDialogOpen = isOpen || internalOpen;

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setInternalOpen(false);
      setSelectedArtwork(null);
    }
  };

  if (!currentArtwork) return null;

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl w-full h-auto p-0 bg-transparent border-none">
        <div className="lightbox-overlay fixed inset-0 bg-black/90 flex items-center justify-center p-4">
          <div className="lightbox-content relative max-w-full max-h-full">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
            >
              <X size={24} />
            </button>
            
            <img
              src={currentArtwork.imageUrl}
              alt={currentArtwork.title}
              className="max-w-full max-h-[90vh] object-contain"
            />
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <h3 className="font-playfair text-2xl font-semibold mb-2">
                {currentArtwork.title}
              </h3>
              <p className="text-gray-300">
                {currentArtwork.medium}, {currentArtwork.year}
              </p>
              {currentArtwork.description && (
                <p className="text-gray-300 mt-2 text-sm">
                  {currentArtwork.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
