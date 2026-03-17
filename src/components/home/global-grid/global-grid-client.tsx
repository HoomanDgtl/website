'use client'

import { useState } from 'react'
import Globe, { defaultProviders } from './globe'
import ProviderCard from './provider-card'

export default function GlobalGridClient() {
  const [selectedId, setSelectedId] = useState<string>(defaultProviders[0].id)
  const provider = defaultProviders.find((p) => p.id === selectedId) ?? defaultProviders[0]

  return (
    <div className="flex justify-center gap-10 py-[80px]">
      <div className="flex h-[500px] w-2/5 items-center justify-center">
        <Globe providers={defaultProviders} selectedId={selectedId} onSelect={setSelectedId} />
      </div>
      <div className="h-[500px] w-1/4">
        <ProviderCard provider={provider} />
      </div>
    </div>
  )
}
