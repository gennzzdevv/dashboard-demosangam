import { X, AlertTriangle, CheckCircle, Clock, Link } from 'lucide-react';
import { Asset, AssetEvent, eventTypeIcons } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface AssetDetailModalProps {
  asset: Asset;
  events: AssetEvent[];
  conflicts?: number;
  onClose: () => void;
}

export function AssetDetailModal({ asset, events, conflicts = 0, onClose }: AssetDetailModalProps) {
  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
    };
  };

  const getStatusBadge = (status: Asset['status']) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-0.5 rounded text-xs font-medium bg-primary/20 text-primary">ACTIVE</span>;
      case 'pending':
        return <span className="px-2 py-0.5 rounded text-xs font-medium bg-warning/20 text-warning">PENDING</span>;
      case 'alert':
        return <span className="px-2 py-0.5 rounded text-xs font-medium bg-destructive/20 text-destructive">ALERT</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/90 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-card border border-border rounded-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
              <span className="text-xl">{eventTypeIcons[asset.lastEvent] || '📦'}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-mono font-bold text-primary">{asset.id}</h2>
                {getStatusBadge(asset.status)}
              </div>
              <p className="text-sm text-muted-foreground">{asset.type}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Tamper Alert */}
        {conflicts > 0 && (
          <div className="mx-4 mt-4 p-3 bg-destructive/10 border border-destructive/30 rounded-md flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0" />
            <div>
              <p className="font-medium text-destructive">🚨 TAMPERING DETECTED!</p>
              <p className="text-sm text-destructive/80">{conflicts} conflict(s) found in event chain</p>
            </div>
          </div>
        )}

        {/* Asset Info */}
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">Asset Information</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="data-label">Batch</p>
              <p className="font-mono text-sm">{asset.batch}</p>
            </div>
            <div>
              <p className="data-label">Origin</p>
              <p className="text-sm">{asset.origin}</p>
            </div>
            <div>
              <p className="data-label">Created</p>
              <p className="font-mono text-sm">{formatDateTime(asset.createdAt).date}</p>
            </div>
          </div>
        </div>

        {/* Event Timeline */}
        <div className="flex-1 overflow-auto p-4">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Event Chain Timeline</h3>
          
          <div className="space-y-4">
            {events.map((event, index) => {
              const { date, time } = formatDateTime(event.timestamp);
              return (
                <div key={event.id} className="relative">
                  {/* Timeline connector */}
                  {index < events.length - 1 && (
                    <div className="absolute left-5 top-12 w-0.5 h-[calc(100%+1rem)] bg-border" />
                  )}
                  
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0 text-lg border border-border">
                      {eventTypeIcons[event.type]}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0 bg-muted/30 rounded-md p-3 border border-border">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <span className="font-medium text-primary">{event.type}</span>
                          <span className="text-muted-foreground mx-2">•</span>
                          <span className="text-sm text-muted-foreground">{event.location}</span>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-mono text-xs">{date}</p>
                          <p className="font-mono text-xs text-muted-foreground">{time}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Operator: </span>
                          <span className="font-mono">{event.operator}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Device: </span>
                          <span className="font-mono">{event.deviceId}</span>
                        </div>
                      </div>
                      
                      <div className="mt-2 pt-2 border-t border-border/50 text-xs">
                        <div className="flex items-center gap-1 text-muted-foreground mb-1">
                          <span>Signature: </span>
                          <span className="font-mono text-foreground">{event.signature}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Link className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {event.chainedTo !== null ? `Chained to Event #${event.chainedTo}` : 'Genesis Event'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {event.synced ? (
                              <>
                                <CheckCircle className="h-3 w-3 text-primary" />
                                <span className="text-primary">Synced to Blockchain</span>
                              </>
                            ) : (
                              <>
                                <Clock className="h-3 w-3 text-warning" />
                                <span className="text-warning">Pending Sync</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
