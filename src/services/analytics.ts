// @ts-ignore
const posthog = window.posthog;

export const initAnalytics = () => {
  console.log('PostHog initialized via index.html script');
  
  // Track initial session start
  if (posthog) {
    posthog.capture('Session Start', {
      time: new Date().toISOString(),
      platform: navigator.platform
    });
  }
};

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (posthog) {
    posthog.capture(eventName, properties);
  }
};

export const identifyUser = (userId: string, traits?: Record<string, any>) => {
  if (posthog) {
    posthog.identify(userId, traits);
  }
};

export default posthog;
