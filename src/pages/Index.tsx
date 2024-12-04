import { useState } from "react";
import { Asset, mockAssets } from "@/types/asset";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { StatusBadge } from "@/components/StatusBadge";
import { AssetForm } from "@/components/AssetForm";
import { useToast } from "@/components/ui/use-toast";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";

export default function Index() {
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const { toast } = useToast();

  const filteredAssets = assets.filter((asset) =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = (data: Omit<Asset, "id">) => {
    const newAsset: Asset = {
      ...data,
      id: Date.now().toString(),
    };
    setAssets((prev) => [...prev, newAsset]);
    setIsAddModalOpen(false);
    toast({
      title: "Sucesso",
      description: "Item adicionado com sucesso!",
    });
  };

  const handleEdit = (data: Omit<Asset, "id">) => {
    if (!selectedAsset) return;
    setAssets((prev) =>
      prev.map((asset) =>
        asset.id === selectedAsset.id ? { ...data, id: asset.id } : asset
      )
    );
    setIsEditModalOpen(false);
    setSelectedAsset(null);
    toast({
      title: "Sucesso",
      description: "Item atualizado com sucesso!",
    });
  };

  const handleDelete = () => {
    if (!selectedAsset) return;
    setAssets((prev) => prev.filter((asset) => asset.id !== selectedAsset.id));
    setIsDeleteDialogOpen(false);
    setSelectedAsset(null);
    toast({
      title: "Sucesso",
      description: "Item removido com sucesso!",
    });
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full sm:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" /> Adicionar Item
        </Button>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="Buscar por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Data Aquisição</TableHead>
              <TableHead>Vida Útil</TableHead>
              <TableHead>Localização</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssets.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell>{asset.code}</TableCell>
                <TableCell>{asset.name}</TableCell>
                <TableCell>{asset.category}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(asset.value)}
                </TableCell>
                <TableCell>
                  {new Date(asset.acquisitionDate).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell>{asset.lifespan} meses</TableCell>
                <TableCell>{asset.location}</TableCell>
                <TableCell>{asset.condition}</TableCell>
                <TableCell>{asset.responsible}</TableCell>
                <TableCell>
                  <StatusBadge status={asset.status} />
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSelectedAsset(asset);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSelectedAsset(asset);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Adicionar Item</DialogTitle>
          </DialogHeader>
          <AssetForm
            onSubmit={handleAdd}
            onCancel={() => setIsAddModalOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Editar Item</DialogTitle>
          </DialogHeader>
          <AssetForm
            initialData={selectedAsset || undefined}
            onSubmit={handleEdit}
            onCancel={() => setIsEditModalOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este item? Esta ação não pode ser
              desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}