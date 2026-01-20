import { RefreshCw, ChevronRight, Package } from 'lucide-react';
import { Asset } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface AssetListProps {
  assets: Asset[];
  onAssetClick: (asset: Asset) => void;
  onRefresh: () => void;
  loading?: boolean;
}

export function AssetList({ assets, onAssetClick, onRefresh, loading }: AssetListProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: Asset['status']) => {
    switch (status) {
      case 'active': return 'status-online';
      case 'pending': return 'status-pending';
      case 'alert': return 'status-alert';
    }
  };

  return (
    <div className="command-panel">
      <div className="command-header">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-primary" />
          <span className="font-medium">All Assets ({assets.length})</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onRefresh}
          disabled={loading}
          className="h-8 px-3 text-muted-foreground hover:text-foreground"
        >
          <RefreshCw className={cn("h-4 w-4 mr-2", loading && "animate-spin")} />
          Refresh
        </Button>
      </div>
      
      <div className="divide-y divide-border">
        {assets.map((asset) => (
          <div
            key={asset.id}
            onClick={() => onAssetClick(asset)}
            className="p-4 hover:bg-muted/50 cursor-pointer transition-colors group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn("status-dot", getStatusColor(asset.status))} />
                  <span className="font-mono text-sm text-primary font-medium">{asset.id}</span>
                </div>
                <p className="text-sm font-medium text-foreground mb-1">{asset.type}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span>Batch: <span className="font-mono">{asset.batch}</span></span>
                  <span>Origin: {asset.origin}</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1">
                  <span>Created: {formatDate(asset.createdAt)}</span>
                  <span>Last Event: <span className="text-primary">{asset.lastEvent}</span></span>
                </div>
              </div>
              <div className="flex items-center text-muted-foreground group-hover:text-primary transition-colors">
                <span className="text-xs mr-2 hidden sm:inline">View history</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
