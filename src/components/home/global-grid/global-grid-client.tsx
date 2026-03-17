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
    <div className="flex justify-center gap-10 py-[80px]">
      <div className={`flex max-h-[550px] items-center justify-center transition-all duration-300 ${cardOpen ? 'w-2/5' : 'w-3/5 my-10'}`}>
        <Globe providers={defaultProviders} selectedId={selectedId} onSelect={handleSelect} />
      </div>
      {cardOpen && (
        <div className="w-1/4">
          <ProviderCard provider={provider} onClose={() => setCardOpen(false)} />
        </div>
      )}
    </div>
  )
}
