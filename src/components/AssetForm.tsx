import { Asset, AssetStatus } from "@/types/asset";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import useAssetStore from "@/store/assetStore";
import { useToast } from "@/components/ui/use-toast";

interface AssetFormProps {
  initialData?: Asset;
  onCancel: () => void;
}

export function AssetForm({ initialData, onCancel }: AssetFormProps) {
  const { addAsset, updateAsset } = useAssetStore();
  const { toast } = useToast();

  const [formData, setFormData] = useState<Partial<Asset>>(
    initialData || {
      code: "",
      name: "",
      category: "",
      value: 0,
      acquisitionDate: "",
      lifespan: 0,
      location: "",
      condition: "",
      responsible: "",
      status: "active" as AssetStatus,
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (initialData) {
        // Update existing asset
        await updateAsset(initialData.id, formData as Partial<Asset>);
        toast({
          title: "Sucesso",
          description: "Item atualizado com sucesso!",
        });
      } else {
        // Add new asset
        await addAsset(formData as Omit<Asset, "id">);
        toast({
          title: "Sucesso",
          description: "Item adicionado com sucesso!",
        });
      }
      onCancel(); // Close the modal or form
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar o item.",
      });
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: AssetStatus) => {
    setFormData((prev) => ({ ...prev, status: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="code">Código</Label>
          <Input
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Categoria</Label>
          <Input
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="value">Valor</Label>
          <Input
            id="value"
            name="value"
            type="number"
            value={formData.value}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="acquisitionDate">Data de Aquisição</Label>
          <Input
            id="acquisitionDate"
            name="acquisitionDate"
            type="date"
            value={formData.acquisitionDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lifespan">Vida Útil (meses)</Label>
          <Input
            id="lifespan"
            name="lifespan"
            type="number"
            value={formData.lifespan}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Localização</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="condition">Estado</Label>
          <Input
            id="condition"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="responsible">Responsável</Label>
          <Input
            id="responsible"
            name="responsible"
            value={formData.responsible}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Ativo</SelectItem>
              <SelectItem value="maintenance">Manutenção</SelectItem>
              <SelectItem value="inactive">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}
