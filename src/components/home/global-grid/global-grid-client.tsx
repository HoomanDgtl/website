'use client'

import { useState } from 'react'
import Globe, { defaultProviders } from './globe'
import ProviderCard from './provider-card'

export default function GlobalGridClient() {
  const [selectedId, setSelectedId] = useState<string>(defaultProviders[0].id)
  const [cardOpen, setCardOpen] = useState(true)
  const provider = defaultProviders.find((p) => p.id === selectedId) ?? defaultProviders[0]

  const handleSelect = (id: string) => {
    setSelectedId(id)
    setCardOpen(true)
  }

  return (
    <div className="flex flex-col items-stretch 2xl:mx-32 px-4 py-10 md:flex-row md:justify-center gap-5 md:px-0 md:py-[80px] ">
      <div className={`w-full bg-[#F5F5F5] dark:bg-[#0E0E0E] overflow-hidden transition-all duration-300 relative min-h-[400px] ${cardOpen ? 'w-2/5' : 'w-3/5 '}`}>
        <div className="absolute top-0 left-0 w-full">
          <Globe providers={defaultProviders} selectedId={selectedId} onSelect={handleSelect} />
        </div>
      </div>
      {cardOpen && (
        <div className="w-full md:max-w-[400px]">
          <ProviderCard provider={provider} onClose={() => setCardOpen(false)} />
        </div>
      )}
    </div>
  )
}
