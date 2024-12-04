import { Badge } from "@/components/ui/badge";
import { AssetStatus } from "@/types/asset";

interface StatusBadgeProps {
  status: AssetStatus;
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

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge className={config.className}>
      {config.label}
    </Badge>
  );
}