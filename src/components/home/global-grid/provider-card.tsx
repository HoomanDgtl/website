import type { Provider } from './globe'

interface Props {
  provider: Provider
  onClose: () => void
}

export default function ProviderCard({ provider, onClose }: Props) {
  const rows = [
    { label: 'Location', value: `${provider.location} ${provider.locationFlag}` },
    { label: 'Uptime', value: provider.uptime },
    { label: 'CPU', value: provider.cpu },
    { label: 'GPUs', value: provider.gpus },
    { label: 'Memory', value: provider.memory },
    { label: 'Leases', value: String(provider.leases) },
  ]

  return (
    <div>
      <div className="mb-2 flex w-full justify-end">
        <button onClick={onClose} className="flex aspect-square size-8 items-center justify-center rounded-full border border-[#4B4B4C]">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.66504 0.664978L0.665039 8.66498M0.665039 0.664978L8.66504 8.66498"
              stroke="currentColor"
              strokeWidth="1.33"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="flex h-full w-full flex-col justify-between rounded-3xl bg-[#242424] p-6">
        {/* Header */}
        <div>
          <div className="mb-0.5 flex items-start justify-between gap-2">
            <span className="font-sans text-sm text-[#8A8F98]">Provider:</span>
            {provider.audited && (
              <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#A8F060] px-3 py-1 font-sans text-xs text-[#0C3205]">
                Audited
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4.10559 5.59753L5.10559 6.59753L7.10559 4.59753M1.53057 3.90758C1.45759 3.57885 1.46879 3.237 1.56314 2.91375C1.6575 2.5905 1.83194 2.29631 2.0703 2.05844C2.30866 1.82058 2.60322 1.64676 2.92667 1.55308C3.25012 1.45941 3.59198 1.44892 3.92057 1.52258C4.10142 1.23973 4.35057 1.00696 4.64504 0.845726C4.93951 0.684489 5.26984 0.599976 5.60557 0.599976C5.94129 0.599976 6.27162 0.684489 6.56609 0.845726C6.86056 1.00696 7.10971 1.23973 7.29057 1.52258C7.61965 1.44859 7.9621 1.45904 8.28606 1.55294C8.61003 1.64684 8.90498 1.82115 9.14349 2.05966C9.38199 2.29817 9.55631 2.59312 9.65021 2.91708C9.74411 3.24105 9.75455 3.5835 9.68056 3.91258C9.96341 4.09344 10.1962 4.34258 10.3574 4.63706C10.5187 4.93153 10.6032 5.26186 10.6032 5.59758C10.6032 5.93331 10.5187 6.26363 10.3574 6.55811C10.1962 6.85258 9.96341 7.10173 9.68056 7.28258C9.75423 7.61117 9.74374 7.95303 9.65007 8.27648C9.55639 8.59993 9.38257 8.89449 9.1447 9.13285C8.90684 9.37121 8.61265 9.54565 8.2894 9.64C7.96614 9.73436 7.6243 9.74556 7.29557 9.67258C7.11495 9.95652 6.8656 10.1903 6.57063 10.3522C6.27565 10.5142 5.94458 10.5991 5.60807 10.5991C5.27155 10.5991 4.94048 10.5142 4.6455 10.3522C4.35053 10.1903 4.10118 9.95652 3.92057 9.67258C3.59198 9.74625 3.25012 9.73576 2.92667 9.64209C2.60322 9.54841 2.30866 9.37458 2.0703 9.13672C1.83194 8.89886 1.6575 8.60466 1.56314 8.28141C1.46879 7.95816 1.45759 7.61632 1.53057 7.28758C1.24554 7.1072 1.01077 6.85767 0.848089 6.56219C0.685407 6.26671 0.600098 5.93489 0.600098 5.59758C0.600098 5.26028 0.685407 4.92845 0.848089 4.63298C1.01077 4.3375 1.24554 4.08796 1.53057 3.90758Z"
                    stroke="#0C3205"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
          </div>
          <h3 className="font-sans text-xl text-white">{provider.name}</h3>
        </div>

        {/* Spec Rows */}
        <div className="mt-5 flex flex-col gap-2.5">
          {rows.map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between gap-3">
              <span className="w-1/3 shrink-0 font-sans text-sm text-white">{label}</span>
              <div className="flex w-2/3 items-center rounded-xl border-2 border-[#4B4B4C] bg-[#333333] px-3 py-2.5">
                <span className="font-sans text-sm text-[#8A8F98]">{value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href="https://console.akash.network/providers"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border-[0.075rem] border-[#4B4B4C] bg-[#333333] px-4 py-3.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-[#3d3d3d]"
        >
          View on Console
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </a>
      </div>
    </div>
  )
}
