useEffect(() => {
  const notifyEvent = (event) => {
      if (Notification.permission === 'granted') {
          new Notification(`Event Reminder: ${event.title}`, {
              body: `Your event is scheduled for ${event.date} at ${event.time}.`,
          });
      }
  };

  const checkEvents = () => {
      const now = new Date();
      events.forEach(event => {
          const eventTime = new Date(`${event.date}T${event.time}`);
          if (eventTime <= now && !event.notified) {
              notifyEvent(event);
              event.notified = true; // Mark as notified
          }
      });
  };

  const interval = setInterval(checkEvents, 60000); // Check every minute
  return () => clearInterval(interval);
}, [events]);