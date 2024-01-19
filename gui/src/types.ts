export interface Network {
  name: string;
  password: boolean;
  signal: number;
  connected: boolean;
}

export interface Station {
  name: string;
  connected: boolean;
}
