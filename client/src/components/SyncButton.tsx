import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SyncButton() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingCount, setPendingCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    const handleSyncStatus = (event: any) => {
      setPendingCount(event.detail.pendingCount);
    };

    const handleSyncNotification = (event: any) => {
      const { message, type } = event.detail;
      toast({
        title: type === 'success' ? 'Success' : type === 'error' ? 'Error' : 'Info',
        description: message,
        variant: type === 'error' ? 'destructive' : 'default'
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('syncStatusChanged', handleSyncStatus);
    window.addEventListener('showSyncNotification', handleSyncNotification);

    // Initial check for pending reports
    if ((window as any).OfflineSync) {
      (window as any).OfflineSync.getPendingReports()
        .then((reports: any[]) => setPendingCount(reports.length))
        .catch(() => setPendingCount(0));
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('syncStatusChanged', handleSyncStatus);
      window.removeEventListener('showSyncNotification', handleSyncNotification);
    };
  }, [toast]);

  const handleSync = async () => {
    if (!isOnline) {
      toast({
        title: 'Offline',
        description: 'Cannot sync while offline. Reports will sync automatically when connection is restored.',
        variant: 'destructive'
      });
      return;
    }

    setIsSyncing(true);
    try {
      await (window as any).OfflineSync?.syncNow();
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {isOnline ? (
          <Wifi className="h-4 w-4 text-green-600" data-testid="icon-online" />
        ) : (
          <WifiOff className="h-4 w-4 text-red-600" data-testid="icon-offline" />
        )}
        <span className="text-xs text-muted-foreground">
          {isOnline ? 'Online' : 'Offline'}
        </span>
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleSync}
        disabled={!isOnline || isSyncing || pendingCount === 0}
        className="relative"
        data-testid="button-sync"
      >
        <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
        Sync Now
        {pendingCount > 0 && (
          <Badge
            id="sync-badge"
            className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-accent text-accent-foreground p-0 flex items-center justify-center text-xs"
          >
            {pendingCount}
          </Badge>
        )}
      </Button>
    </div>
  );
}
