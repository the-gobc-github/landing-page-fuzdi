'use client';

import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import Image from 'next/image';

export interface ImageCarouselRef {
    triggerGeneration: () => void;
}

const ImageCarousel = forwardRef<ImageCarouselRef, {}>((props, ref) => {
    // Simple image carousel with animation
    const allImages = [
        'ComfyUI_00443__0000_ComfyUI_00459_.png',
        'ComfyUI_00443__0001_ComfyUI_00456_.png',
        'ComfyUI_00443__0002_ComfyUI_00443_.png',
        'ComfyUI_00443__0003_ComfyUI_00430_.png',
        'ComfyUI_00443__0004_ComfyUI_00422_.png',
        'ComfyUI_00443__0005_ComfyUI_00419_.png',
        'ComfyUI_00443__0006_ComfyUI_00416_.png',
        'ComfyUI_00443__0007_ComfyUI_00409_.png',
        'ComfyUI_00443__0008_ComfyUI_00399_.png',
        'ComfyUI_00443__0009_ComfyUI_00384_.png',
        'ComfyUI_00443__0010_ComfyUI_00371_.png',
        'ComfyUI_00443__0011_ComfyUI_00364_.png',
        'ComfyUI_00443__0012_ComfyUI_00363_.png',
        'ComfyUI_00443__0013_ComfyUI_00355_.png',
        'ComfyUI_00443__0014_ComfyUI_00351_.png',
        'ComfyUI_00443__0015_ComfyUI_00335_.png',
        'ComfyUI_00443__0016_ComfyUI_00324_.png',
        'ComfyUI_00443__0017_ComfyUI_00309_.png',
        'ComfyUI_00443__0018_ComfyUI_00303_.png',
        'ComfyUI_00443__0019_ComfyUI_00289_.png',
        'ComfyUI_00443__0020_ComfyUI_00281_.png',
        'ComfyUI_00443__0021_ComfyUI_00269_.png',
        'ComfyUI_00443__0022_ComfyUI_00256_.png',
        'ComfyUI_00443__0023_ComfyUI_00248_.png',
        'ComfyUI_00443__0024_ComfyUI_00245_.png',
        'ComfyUI_00443__0025_ComfyUI_00233_.png',
        'ComfyUI_00443__0026_ComfyUI_00223_.png',
        'ComfyUI_00443__0027_ComfyUI_00218_.png',
        'ComfyUI_00443__0028_ComfyUI_00215_.png',
        'ComfyUI_00443__0029_ComfyUI_00213_.png',
        'ComfyUI_00443__0030_Background.png'
    ];

    const [currentImage, setCurrentImage] = useState(allImages[0]);
    const [scrollImages, setScrollImages] = useState<string[]>([]);
    const [currentScrollIndex, setCurrentScrollIndex] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);

    const startNewCycle = () => {
        // Get 8 random images for scrolling
        const shuffled = [...allImages].sort(() => Math.random() - 0.5);
        const scrollList = shuffled.slice(0, 8);

        // Pick a different final image (not the current one)
        let finalImage;
        do {
            finalImage = allImages[Math.floor(Math.random() * allImages.length)];
        } while (finalImage === currentImage);

        setScrollImages(scrollList);
        setIsScrolling(true);
        setCurrentScrollIndex(0);

        // Scroll through images quickly
        let index = 0;
        const scrollInterval = setInterval(() => {
            index++;
            if (index >= scrollList.length) {
                clearInterval(scrollInterval);
                // End on the final image
                setCurrentImage(finalImage);
                setIsScrolling(false);
            } else {
                setCurrentScrollIndex(index);
            }
        }, 150); // 150ms per image = 1.2 seconds total scroll
    };

    // Expose triggerGeneration method to parent
    useImperativeHandle(ref, () => ({
        triggerGeneration: startNewCycle
    }));

    const displayImage = isScrolling ? scrollImages[currentScrollIndex] : currentImage;

    return (
        <div className="flex flex-col items-center space-y-4 pt-24">
            {/* Simple Image Display */}
            <div className="relative h-96 w-136 max-w-2xl rounded-lg overflow-hidden">
                <Image
                    src={`/logos/${displayImage}`}
                    alt="AI Generated Image"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 672px"
                />
            </div>


        </div>
    );
});

ImageCarousel.displayName = 'ImageCarousel';

export default ImageCarousel;