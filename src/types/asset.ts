export type AssetStatus = "active" | "maintenance" | "inactive";

export interface Asset {
  id: string;
  code: string;
  name: string;
  category: string;
  value: number;
  acquisitionDate: string;
  lifespan: number;
  location: string;
  condition: string;
  responsible: string;
  status: AssetStatus;
  createdAt: Date;
}
