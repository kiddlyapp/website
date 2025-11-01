"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"
import { BlocksContent } from "@strapi/blocks-react-renderer"
import { useTranslations } from "next-intl";
import BlockRendererClient from "./BlockRendererClient"

interface MarketingPopupProps {
  title: string;
  body: BlocksContent;
  info: BlocksContent;
  mainActionText: string | undefined | null;
  mainActionUrl: string | undefined | null;
  secondaryActionText: string | undefined | null;
  secondaryActionUrl: string | undefined | null;
  photo: string;
}

export default function MarketingPopup({ title, body, info, mainActionText, mainActionUrl, secondaryActionText, secondaryActionUrl, photo }: MarketingPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations();

  useEffect(() => {
    // Show popup after a short delay when component mounts
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md mx-auto p-0 overflow-hidden border-0 shadow-2xl [&>button]:hidden">
          <div className="relative">
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">{t('close')}</span>
            </Button>

            {/* Hero Image */}
            {photo && (
              <div className="relative aspect-[2/1] w-full">
                <Image
                  src={photo}
                  alt={title}
                  fill
                  className="object-cover"
                  quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            )}

            {/* Content */}
            <div className="p-6 space-y-4 text-gray-600 leading-relaxed">
              <DialogHeader className="space-y-3">
                <DialogTitle className="text-2xl font-bold text-gray-900 leading-tight">
                  {title}
                </DialogTitle>
              </DialogHeader>

              <BlockRendererClient content={body} />

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {mainActionUrl && (
                  <Button
                    className={`flex-1 bg-brand-yellow hover:bg-brand-yellow/80 text-white font-medium cursor-pointer${!secondaryActionUrl ? ' w-full' : ''}`}
                    onClick={() => {
                      window.open(mainActionUrl)
                      setIsOpen(false)
                    }}
                  >
                    {mainActionText}
                  </Button>
                )}
                {secondaryActionUrl && (
                  <Button
                    variant="outline"
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent cursor-pointer"
                    onClick={() => {
                      window.open(secondaryActionUrl)
                      setIsOpen(false)
                    }}
                  >
                    {secondaryActionText}
                  </Button>
                )}
              </div>

              {info && (
                <div className="text-xs text-gray-500 text-center pt-2">
                  <BlockRendererClient content={info} />
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
  )
}
