"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { publicUrl } from "@/lib/strapi"
import { useTranslations } from "next-intl"

interface GalleryItem {
  formats: {
    large: {
      url: string;
    },
    medium: {
      url: string;
    },
    small: {
      url: string;
    }
  },
  url: string;
}

interface PhotoGalleryProps {
  title: string
  images: GalleryItem[]
  previewCount?: number
}

export default function PhotoGallery({ title, images, previewCount = 6 }: PhotoGalleryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const t = useTranslations()
  
  const previewImages = images.slice(0, previewCount)
  const remainingCount = Math.max(0, images.length - previewCount)

  const openModal = (index: number) => {
    setCurrentImageIndex(index)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isModalOpen) return

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault()
          goToPrevious()
          break
        case "ArrowRight":
          event.preventDefault()
          goToNext()
          break
        case "Escape":
          event.preventDefault()
          closeModal()
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isModalOpen])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isModalOpen])

  return (
    <div className="w-full mx-auto p-6">
      {/* Gallery Title */}
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">{t('gallery.title')}</h2>

      {/* Gallery Grid */}
      <div className="flex flex-row flex-wrap items-center justify-center gap-4">
        {previewImages.map((image, index) => (
          <div key={index} className="relative group cursor-pointer" onClick={() => openModal(index)}>
            <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100 transition-all duration-300 group-hover:scale-105 grope-hover:stroke">
              <Image
                src={publicUrl(image.url)}
                alt={title}
                width={150}
                height={150}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          </div>
        ))}

        {/* Show remaining count if there are more images */}
        {remainingCount > 0 && (
          <div
            className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center cursor-pointer group hover:bg-gray-200 transition-colors duration-300 h-[200px] w-[200px]"
            onClick={() => openModal(previewCount)}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600 group-hover:text-gray-800">+{remainingCount}</div>
              <div className="text-sm text-gray-500 group-hover:text-gray-700">{t('gallery.morePhotos')}</div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 text-white hover:bg-white hover:bg-opacity-20"
            onClick={closeModal}
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Navigation buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white hover:bg-opacity-20"
            onClick={goToPrevious}
            disabled={images.length <= 1}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white hover:bg-opacity-20"
            onClick={goToNext}
            disabled={images.length <= 1}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>

          {/* Main image */}
          <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
            <Image
              src={publicUrl(images[currentImageIndex].url)}
              alt={title}
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain"
              priority
            />
          </div>
        </div>
      )}
    </div>
  )
}
