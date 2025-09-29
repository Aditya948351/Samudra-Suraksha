/**
 * Offline Data Persistence and Synchronization System
 * Pure JavaScript implementation - No frameworks or TypeScript
 * 
 * Features:
 * - Store hazard reports locally using IndexedDB
 * - Track sync status (pending/synced)
 * - Auto-sync when connectivity restored
 * - Manual sync capability
 * - No data loss guarantee
 */

(function() {
  'use strict';

  const DB_NAME = 'SamudraSachetDB';
  const DB_VERSION = 1;
  const STORE_NAME = 'hazardReports';
  let db = null;

  /**
   * Initialize IndexedDB database
   */
  function initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject('Failed to open database');
      
      request.onsuccess = (event) => {
        db = event.target.result;
        console.log('[OfflineSync] Database initialized');
        resolve(db);
      };

      request.onupgradeneeded = (event) => {
        const database = event.target.result;
        
        if (!database.objectStoreNames.contains(STORE_NAME)) {
          const objectStore = database.createObjectStore(STORE_NAME, { 
            keyPath: 'id',
            autoIncrement: true 
          });
          
          objectStore.createIndex('syncStatus', 'syncStatus', { unique: false });
          objectStore.createIndex('timestamp', 'timestamp', { unique: false });
          
          console.log('[OfflineSync] Object store created');
        }
      };
    });
  }

  /**
   * Save a hazard report locally with pending sync status
   * @param {Object} reportData - Report data including text, location, media
   * @returns {Promise<number>} Report ID
   */
  function saveReportLocally(reportData) {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject('Database not initialized');
        return;
      }

      const report = {
        ...reportData,
        syncStatus: 'pending',
        timestamp: new Date().toISOString(),
        createdOffline: !navigator.onLine
      };

      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const objectStore = transaction.objectStore(STORE_NAME);
      const request = objectStore.add(report);

      request.onsuccess = () => {
        const reportId = request.result;
        console.log('[OfflineSync] Report saved locally:', reportId);
        updateSyncBadge();
        resolve(reportId);
      };

      request.onerror = () => reject('Failed to save report locally');
    });
  }

  /**
   * Get all pending reports that need to be synced
   * @returns {Promise<Array>} Array of pending reports
   */
  function getPendingReports() {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject('Database not initialized');
        return;
      }

      const transaction = db.transaction([STORE_NAME], 'readonly');
      const objectStore = transaction.objectStore(STORE_NAME);
      const index = objectStore.index('syncStatus');
      const request = index.getAll('pending');

      request.onsuccess = () => {
        const reports = request.result;
        console.log('[OfflineSync] Found pending reports:', reports.length);
        resolve(reports);
      };

      request.onerror = () => reject('Failed to get pending reports');
    });
  }

  /**
   * Mark a report as synced
   * @param {number} reportId - Report ID
   */
  function markAsSynced(reportId) {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject('Database not initialized');
        return;
      }

      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const objectStore = transaction.objectStore(STORE_NAME);
      const getRequest = objectStore.get(reportId);

      getRequest.onsuccess = () => {
        const report = getRequest.result;
        if (report) {
          report.syncStatus = 'synced';
          report.syncedAt = new Date().toISOString();
          
          const updateRequest = objectStore.put(report);
          
          updateRequest.onsuccess = () => {
            console.log('[OfflineSync] Report marked as synced:', reportId);
            updateSyncBadge();
            resolve();
          };
          
          updateRequest.onerror = () => reject('Failed to update sync status');
        } else {
          reject('Report not found');
        }
      };

      getRequest.onerror = () => reject('Failed to get report');
    });
  }

  /**
   * Upload a single report to server
   * @param {Object} report - Report data
   * @returns {Promise<boolean>} Success status
   */
  async function uploadReport(report) {
    try {
      // TODO: Replace with actual server endpoint
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hazardType: report.hazardType,
          description: report.description,
          latitude: report.latitude,
          longitude: report.longitude,
          timestamp: report.timestamp,
          imageData: report.imageData // Base64 or reference
        })
      });

      if (response.ok) {
        console.log('[OfflineSync] Report uploaded successfully:', report.id);
        return true;
      } else {
        console.error('[OfflineSync] Upload failed:', response.status);
        return false;
      }
    } catch (error) {
      console.error('[OfflineSync] Upload error:', error);
      return false;
    }
  }

  /**
   * Sync all pending reports to server
   */
  async function syncPendingReports() {
    if (!navigator.onLine) {
      console.log('[OfflineSync] Cannot sync - offline');
      showSyncNotification('Cannot sync while offline', 'warning');
      return;
    }

    try {
      const pendingReports = await getPendingReports();
      
      if (pendingReports.length === 0) {
        console.log('[OfflineSync] No pending reports to sync');
        showSyncNotification('All reports are synced', 'success');
        return;
      }

      console.log('[OfflineSync] Syncing', pendingReports.length, 'reports...');
      showSyncNotification(`Syncing ${pendingReports.length} reports...`, 'info');

      let successCount = 0;
      let failCount = 0;

      // Upload reports in order they were created
      for (const report of pendingReports) {
        const success = await uploadReport(report);
        
        if (success) {
          await markAsSynced(report.id);
          successCount++;
        } else {
          failCount++;
        }
      }

      if (failCount === 0) {
        showSyncNotification(`Successfully synced ${successCount} reports`, 'success');
      } else {
        showSyncNotification(`Synced ${successCount}, ${failCount} failed`, 'warning');
      }
    } catch (error) {
      console.error('[OfflineSync] Sync failed:', error);
      showSyncNotification('Sync failed. Will retry automatically.', 'error');
    }
  }

  /**
   * Get all reports (both synced and pending)
   * @returns {Promise<Array>} All reports with sync status
   */
  function getAllReports() {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject('Database not initialized');
        return;
      }

      const transaction = db.transaction([STORE_NAME], 'readonly');
      const objectStore = transaction.objectStore(STORE_NAME);
      const request = objectStore.getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => reject('Failed to get reports');
    });
  }

  /**
   * Update sync status badge/indicator
   */
  async function updateSyncBadge() {
    try {
      const pendingReports = await getPendingReports();
      const badge = document.getElementById('sync-badge');
      
      if (badge) {
        if (pendingReports.length > 0) {
          badge.textContent = pendingReports.length;
          badge.style.display = 'flex';
        } else {
          badge.style.display = 'none';
        }
      }

      // Dispatch custom event for UI updates
      window.dispatchEvent(new CustomEvent('syncStatusChanged', {
        detail: { pendingCount: pendingReports.length }
      }));
    } catch (error) {
      console.error('[OfflineSync] Failed to update badge:', error);
    }
  }

  /**
   * Show sync notification to user
   * @param {string} message - Notification message
   * @param {string} type - 'success', 'error', 'warning', 'info'
   */
  function showSyncNotification(message, type) {
    // Dispatch custom event for toast notifications
    window.dispatchEvent(new CustomEvent('showSyncNotification', {
      detail: { message, type }
    }));
  }

  /**
   * Listen for online/offline events
   */
  function setupConnectivityListeners() {
    window.addEventListener('online', () => {
      console.log('[OfflineSync] Connection restored - auto-syncing...');
      showSyncNotification('Connection restored. Syncing reports...', 'info');
      syncPendingReports();
    });

    window.addEventListener('offline', () => {
      console.log('[OfflineSync] Connection lost - offline mode');
      showSyncNotification('Offline mode. Reports will sync when connected.', 'warning');
    });
  }

  /**
   * Initialize the offline sync system
   */
  async function initialize() {
    try {
      await initDB();
      setupConnectivityListeners();
      await updateSyncBadge();
      
      // Auto-sync on page load if online
      if (navigator.onLine) {
        const pendingReports = await getPendingReports();
        if (pendingReports.length > 0) {
          console.log('[OfflineSync] Auto-syncing pending reports on startup...');
          setTimeout(() => syncPendingReports(), 2000); // Delay to ensure UI is ready
        }
      }

      console.log('[OfflineSync] System initialized successfully');
    } catch (error) {
      console.error('[OfflineSync] Initialization failed:', error);
    }
  }

  // Expose API to window object
  window.OfflineSync = {
    saveReport: saveReportLocally,
    syncNow: syncPendingReports,
    getPendingReports: getPendingReports,
    getAllReports: getAllReports,
    isOnline: () => navigator.onLine
  };

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

})();
