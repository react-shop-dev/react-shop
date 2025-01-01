import { useNavigationEvent } from '../router/useNavigationEvents';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: Record<string, any>;
  }
}

export const eventAnalytics = ({ action, category, label, value }: any) => {
  // https://developers.google.com/analytics/devguides/collection/gtagjs/events
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export const useAnalytics = (gtag?: string) => {
  useNavigationEvent((pathname: string) => {
    if (!gtag) return;
    // https://developers.google.com/analytics/devguides/collection/gtagjs/pages
    window.gtag('config', gtag, {
      page_path: pathname,
    });
  });
};
