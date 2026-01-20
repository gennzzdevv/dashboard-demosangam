import { useState } from 'react';
import { StatsBar } from '@/components/dashboard/StatsBar';
import { AssetMap } from '@/components/dashboard/AssetMap';
import { EventChart } from '@/components/dashboard/EventChart';
import { AssetList } from '@/components/dashboard/AssetList';
import { AssetDetailModal } from '@/components/dashboard/AssetDetailModal';
import { mockAssets, mockEvents, eventDistribution, Asset } from '@/lib/mockData';

const Dashboard = () => {
  const [assets] = useState(mockAssets);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(false);

  const totalEvents = Object.values(mockEvents).reduce((acc, events) => acc + events.length, 0);

  const handleRefresh = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => setLoading(false), 1000);
  };

  const handleAssetClick = (asset: Asset) => {
    setSelectedAsset(asset);
  };

  const getAssetEvents = (assetId: string) => {
    return mockEvents[assetId] || [];
  };

  const getConflictCount = (asset: Asset) => {
    return asset.status === 'alert' ? 1 : 0;
  };

  return (
    <div className="space-y-6">
      {/* Stats Bar */}
      <StatsBar totalAssets={assets.length} totalEvents={totalEvents} />

      {/* Map and Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AssetMap assets={assets} onAssetClick={handleAssetClick} />
        <EventChart data={eventDistribution} />
      </div>

      {/* Asset List */}
      <AssetList 
        assets={assets} 
        onAssetClick={handleAssetClick}
        onRefresh={handleRefresh}
        loading={loading}
      />

      {/* Asset Detail Modal */}
      {selectedAsset && (
        <AssetDetailModal
          asset={selectedAsset}
          events={getAssetEvents(selectedAsset.id)}
          conflicts={getConflictCount(selectedAsset)}
          onClose={() => setSelectedAsset(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
