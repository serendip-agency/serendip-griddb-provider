export interface GriddbProviderOptions {
  infs: {
    [key: string]: {
      provider: string;
      url: string;
      memory: number;
      hard: number;
    };
  };
}
