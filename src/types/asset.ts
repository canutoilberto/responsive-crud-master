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
}

export const mockAssets: Asset[] = [
  {
    id: "1",
    code: "AST001",
    name: "Laptop Dell XPS",
    category: "Electronics",
    value: 5000,
    acquisitionDate: "2023-01-15",
    lifespan: 48,
    location: "Office A",
    condition: "Good",
    responsible: "John Doe",
    status: "active",
  },
  {
    id: "2",
    code: "AST002",
    name: "Office Chair",
    category: "Furniture",
    value: 500,
    acquisitionDate: "2023-02-20",
    lifespan: 60,
    location: "Office B",
    condition: "Needs repair",
    responsible: "Jane Smith",
    status: "maintenance",
  },
];