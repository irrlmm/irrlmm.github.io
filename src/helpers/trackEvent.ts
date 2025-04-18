const trackEvent: typeof window.posthog.capture = (id, props) => {
  // event tracking based on passed progress
  if (window.posthog) {
    try {
      window.posthog.capture(id, props);
    } catch (e) {
      console.log("event capture failed" + e);
    }
  } else {
    console.log(id, props);
  }
};

export default trackEvent;
