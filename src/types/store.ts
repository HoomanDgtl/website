
export interface TokenState {
  time: number;
  [key: string]: unknown;
}

export interface GpuState {
  time: number;
  [key: string]: unknown;
}

export interface IStore {
  token: TokenState | null;
  setToken: (token: TokenState) => void;
  gpu: GpuState | null;
  setGpu: (gpu: GpuState) => void;
  docsLinkTracks: { [link: string]: boolean };
  setDocsLinkTracks: (data: { [link: string]: boolean }) => void;

}

/**
 * Token data type alias
 */
export type TokenData = TokenState;