"use client";

import { useState, useEffect, useCallback } from "react";
import { EVENT_LIVE_CONFIG } from "@/_config/Event.config";

export interface LiveEventData {
  _id: string;
  startDate: string; // ISO string
  endDate: string; // ISO string
  liveStreamUrl?: string;
}

export function useLiveStatus(event: LiveEventData | null) {
  // Pure function to calculate status during render phase
  const getStatus = useCallback(() => {
    if (!event) return false;
    const now = Date.now();
    const start = new Date(event.startDate).getTime();
    const end = new Date(event.endDate).getTime();
    const bufferMs = (EVENT_LIVE_CONFIG.bufferMinutes || 0) * 60 * 1000;

    return now >= start - bufferMs && now <= end;
  }, [event]);

  const [isLive, setIsLive] = useState(getStatus);
  const [prevEventId, setPrevEventId] = useState(event?._id);

  // SYNC: If the event prop changes (e.g., page navigation), update state during render
  if (event?._id !== prevEventId) {
    setPrevEventId(event?._id);
    setIsLive(getStatus());
  }

  useEffect(() => {
    if (!event) return;

    const updateStatus = () => setIsLive(getStatus());
    const now = Date.now();
    const startTime = new Date(event.startDate).getTime();
    const endTime = new Date(event.endDate).getTime();
    const bufferMs = (EVENT_LIVE_CONFIG.bufferMinutes || 0) * 60 * 1000;
    const effectiveStartTime = startTime - bufferMs;

    const timers: NodeJS.Timeout[] = [];

    // Timer 1: Schedule the "Go Live" transition (including buffer window)
    if (now < effectiveStartTime) {
      const startTimer = setTimeout(() => {
        updateStatus();
      }, effectiveStartTime - now);
      timers.push(startTimer);
    }

    // Timer 2: If event is currently live or will be live, schedule the "Remove Live" transition
    if (now < endTime) {
      const endTimer = setTimeout(() => {
        updateStatus();
      }, endTime - now);
      timers.push(endTimer);
    }

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [event, getStatus]);

  return {
    isLive,
    liveStreamUrl:
      event?.liveStreamUrl || EVENT_LIVE_CONFIG.defaultLiveStreamUrl,
  };
}
