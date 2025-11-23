import {inject, Injectable} from '@angular/core';
import {WINDOW} from '../tokens/window.token';

/**
 * Service for tracking active time spent on specific pages.
 * Tracks only when the tab is active and visible to the user.
 */
@Injectable({
  providedIn: 'root'
})
export class PageTimeTrackerService {
  private _trackers = new Map<string, {
    startTime?: number;
    totalTime: number;
    isActive: boolean;
    requiredTime: number;
    onComplete?: () => void;
    visibilityHandler?: () => void;
    cleanupTimeout?: number;
  }>();
  private readonly _window = inject(WINDOW);

  /**
   * Start tracking time for a specific page
   * @param pageKey - Unique identifier for the page
   * @param requiredTimeMs - Required time in milliseconds to consider complete
   * @param onComplete - Callback function when required time is reached
   */
  startTracking(pageKey: string, requiredTimeMs: number, onComplete?: () => void): void {
    // Don't start if already completed
    if (this.isCompleted(pageKey)) {
      return;
    }

    const existingTracker = this._trackers.get(pageKey);

    // If tracker exists and is active, don't restart
    if (existingTracker?.isActive) {
      return;
    }

    const tracker = {
      startTime: Date.now(),
      totalTime: existingTracker?.totalTime || 0,
      isActive: true,
      requiredTime: requiredTimeMs,
      onComplete
    };

    this._trackers.set(pageKey, tracker);
    this._setupVisibilityTracking(pageKey);
  }

  /**
   * Stop tracking time for a specific page
   * @param pageKey - Unique identifier for the page
   */
  stopTracking(pageKey: string): void {
    const tracker = this._trackers.get(pageKey);

    if (!tracker || !tracker.isActive) {
      return;
    }

    // Add session time to total
    if (tracker.startTime) {
      const sessionTime = Date.now() - tracker.startTime;
      tracker.totalTime += sessionTime;
    }

    tracker.isActive = false;
    tracker.startTime = undefined;

    // Check if completed
    if (tracker.totalTime >= tracker.requiredTime && tracker.onComplete) {
      tracker.onComplete();
    }

    // Cleanup visibility handler
    this._cleanupVisibilityHandler(pageKey);
  }

  /**
   * Check if the required time has been reached for a page
   * @param pageKey - Unique identifier for the page
   * @returns true if required time has been reached
   */
  isCompleted(pageKey: string): boolean {
    const tracker = this._trackers.get(pageKey);
    return tracker ? tracker.totalTime >= tracker.requiredTime : false;
  }

  /**
   * Get current progress (0-1) for a page
   * @param pageKey - Unique identifier for the page
   * @returns progress as a number between 0 and 1
   */
  getProgress(pageKey: string): number {
    const tracker = this._trackers.get(pageKey);
    if (!tracker) return 0;

    let currentTotal = tracker.totalTime;

    // Add current session time if active
    if (tracker.isActive && tracker.startTime) {
      currentTotal += Date.now() - tracker.startTime;
    }

    return Math.min(currentTotal / tracker.requiredTime, 1);
  }

  /**
   * Get total time spent on a page in milliseconds
   * @param pageKey - Unique identifier for the page
   * @returns total time in milliseconds
   */
  getTotalTime(pageKey: string): number {
    const tracker = this._trackers.get(pageKey);
    if (!tracker) return 0;

    let currentTotal = tracker.totalTime;

    // Add current session time if active
    if (tracker.isActive && tracker.startTime) {
      currentTotal += Date.now() - tracker.startTime;
    }

    return currentTotal;
  }

  /**
   * Reset tracking data for a specific page
   * @param pageKey - Unique identifier for the page
   */
  resetTracking(pageKey: string): void {
    const tracker = this._trackers.get(pageKey);

    if (tracker) {
      this._cleanupVisibilityHandler(pageKey);
      this._trackers.delete(pageKey);
    }
  }

  /**
   * Reset all tracking data
   */
  resetAllTracking(): void {
    for (const [pageKey] of this._trackers) {
      this.resetTracking(pageKey);
    }
  }

  private _setupVisibilityTracking(pageKey: string): void {
    const tracker = this._trackers.get(pageKey);
    if (!tracker) return;

    const handleVisibilityChange = () => {
      const currentTracker = this._trackers.get(pageKey);
      if (!currentTracker?.isActive) return;

      if (this._window?.document.hidden) {
        // Tab became inactive - pause tracking
        if (currentTracker.startTime) {
          const sessionTime = Date.now() - currentTracker.startTime;
          currentTracker.totalTime += sessionTime;
          currentTracker.startTime = undefined;
        }
      } else {
        // Tab became active - resume tracking
        currentTracker.startTime = Date.now();
      }

      // Check if completed after visibility change
      if (currentTracker.totalTime >= currentTracker.requiredTime && currentTracker.onComplete) {
        currentTracker.onComplete();
      }
    };

    // Store the handler for cleanup
    tracker.visibilityHandler = handleVisibilityChange;
    this._window?.document.addEventListener('visibilitychange', handleVisibilityChange);

    // Auto-cleanup after 10 minutes to prevent memory leaks
    tracker.cleanupTimeout = this._window?.setTimeout(() => {
      this._cleanupVisibilityHandler(pageKey);
    }, 600000);
  }

  private _cleanupVisibilityHandler(pageKey: string): void {
    const tracker = this._trackers.get(pageKey);

    if (tracker?.visibilityHandler) {
      this._window?.document.removeEventListener('visibilitychange', tracker.visibilityHandler);
      tracker.visibilityHandler = undefined;
    }

    if (tracker?.cleanupTimeout) {
      clearTimeout(tracker.cleanupTimeout);
      tracker.cleanupTimeout = undefined;
    }
  }
}
