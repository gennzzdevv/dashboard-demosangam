import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Asset } from '@/lib/mockData';
import { MapPin } from 'lucide-react';

interface AssetMapProps {
  assets: Asset[];
  onAssetClick?: (asset: Asset) => void;
}

export function AssetMap({ assets, onAssetClick }: AssetMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          'carto-dark': {
            type: 'raster',
            tiles: [
              'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
              'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
              'https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png'
            ],
            tileSize: 256,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          }
        },
        layers: [
          {
            id: 'carto-dark-layer',
            type: 'raster',
            source: 'carto-dark',
            minzoom: 0,
            maxzoom: 19
          }
        ]
      },
      center: [78.9629, 20.5937], // Center on India
      zoom: 4,
      attributionControl: false
    });

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add markers for each asset
    assets.forEach(asset => {
      const el = document.createElement('div');
      el.className = 'asset-marker';
      el.innerHTML = `
        <div class="w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110" 
             style="background-color: ${asset.status === 'alert' ? '#ef4444' : asset.status === 'pending' ? '#f59e0b' : '#00ff88'}; 
                    box-shadow: 0 0 12px ${asset.status === 'alert' ? 'rgba(239, 68, 68, 0.6)' : asset.status === 'pending' ? 'rgba(245, 158, 11, 0.6)' : 'rgba(0, 255, 136, 0.6)'};">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" stroke-width="3">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
      `;

      el.addEventListener('click', () => {
        onAssetClick?.(asset);
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([asset.location.lng, asset.location.lat])
        .setPopup(
          new maplibregl.Popup({ offset: 25, closeButton: false })
            .setHTML(`
              <div style="background: #1a1a1a; color: #e5e5e5; padding: 8px 12px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; font-size: 12px;">
                <div style="font-weight: 600; color: #00ff88;">${asset.id}</div>
                <div style="color: #888; margin-top: 4px;">${asset.type}</div>
                <div style="margin-top: 4px;">Last: ${asset.lastEvent}</div>
              </div>
            `)
        )
        .addTo(map.current!);

      markersRef.current.push(marker);
    });
  }, [assets, onAssetClick]);

  return (
    <div className="command-panel h-full">
      <div className="command-header">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="font-medium">Asset Location Map</span>
        </div>
        <span className="text-xs text-muted-foreground">{assets.length} assets tracked</span>
      </div>
      <div className="h-[400px]">
        <div ref={mapContainer} className="w-full h-full rounded-b-md" />
      </div>
    </div>
  );
}
