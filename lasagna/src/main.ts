import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import * as Sentry from '@sentry/angular';
import {enableProfiling} from '@angular/core';
import './polyfils/to-sorted';
import {environment} from './environments/environment';

if (environment.region === 'global' && environment.production) {
  import('@vercel/speed-insights')
    .then(({injectSpeedInsights}) => {
      injectSpeedInsights();
    });
}

Sentry.init({
  dsn: "https://6f5f68ff28550996e10e8c4a49edc46e@o4509209983057920.ingest.de.sentry.io/4509209987645520",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  beforeSend(event) {
    // Set user context with userUUID from localStorage for each event
    try {
      const userUUID = localStorage.getItem('userUUID');
      if (userUUID) {
        event.user = {
          user_weak_uuid: userUUID
        };
      }
    } catch {
      // Ignore localStorage errors
    }
    return event;
  }
});

enableProfiling();

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
