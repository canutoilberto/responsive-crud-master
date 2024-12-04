import { Badge } from "@/components/ui/badge";
import { AssetStatus } from "@/types/asset";
import useAssetStore from "@/store/assetStore";
import { useEffect, useState } from "react";

interface StatusBadgeProps {
  assetId: string; // Adiciona o ID do ativo para buscar e atualizar o status
}

const statusConfig = {
  active: {
    label: "Ativo",
    className: "bg-green-500 hover:bg-green-600",
  },
  maintenance: {
    label: "Manutenção",
    className: "bg-yellow-500 hover:bg-yellow-600",
  },
  inactive: {
    label: "Inativo",
    className: "bg-red-500 hover:bg-red-600",
  },
};

export function StatusBadge({ assetId }: StatusBadgeProps) {
  const { assets, updateAsset } = useAssetStore();
  const [status, setStatus] = useState<AssetStatus>("active");

  // Busca o status do ativo com base no ID
  useEffect(() => {
    const asset = assets.find((a) => a.id === assetId);
    if (asset) {
      setStatus(asset.status);
    }
  }, [assets, assetId]);

  const handleStatusChange = async () => {
    const newStatus =
      status === "active"
        ? "maintenance"
        : status === "maintenance"
        ? "inactive"
        : "active";

    try {
      await updateAsset(assetId, { status: newStatus });
      setStatus(newStatus);
    } catch (error) {
      console.error("Erro ao atualizar o status:", error);
    }
  };

  const config = statusConfig[status];

  return (
    <Badge
      className={`${config.className} cursor-pointer`}
      onClick={handleStatusChange}
      title="Clique para alterar o status"
    >
      {config.label}
    </Badge>
  );
}
