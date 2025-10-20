export type TrackEventData = Record<string, unknown>;

export interface TrackService {
    sendEvent(eventName: string, data?: TrackEventData): void;
}

export const trackService: TrackService = {
    sendEvent(eventName: string, data?: TrackEventData) {
        console.log(`[埋点上报] 📊 事件: ${eventName}`,data);
    },
};