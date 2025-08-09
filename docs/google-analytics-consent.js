// Google Analytics Configuration
const GA_TRACKING_ID = 'G-GWN769JKRP';
let gtagLoaded = false;

// Dynamic Google Analytics loader
function loadGoogleAnalytics(
  callback = () => { }
) {
  if (gtagLoaded) return;

  // Create and load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;

  script.onload = function() {
    // Initialize gtag after script loads
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;

    // Set default consent to 'denied'
    gtag('consent', 'default', {
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'analytics_storage': 'denied'
    });

    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID);

    gtagLoaded = true;
    console.log('Google Analytics loaded dynamically');

    // Execute callback after GA is fully initialized
    if (typeof callback === 'function') {
      callback();
    }
  };

  document.head.appendChild(script);
}

// Google Analytics Consent Management Functions
function consentGrantedAdStorage() {
  if (!gtagLoaded) {
    loadGoogleAnalytics(() => {
      gtag('consent', 'update', {
        'ad_storage': 'granted'
      });
    });
  } else {
    gtag('consent', 'update', {
      'ad_storage': 'granted'
    });
  }
}

function consentGrantedAdUserData() {
  if (!gtagLoaded) {
    loadGoogleAnalytics(() => {
      gtag('consent', 'update', {
        'ad_user_data': 'granted'
      });
    });
  } else {
    gtag('consent', 'update', {
      'ad_user_data': 'granted'
    });
  }
}

function consentGrantedAdPersonalization() {
  if (!gtagLoaded) {
    loadGoogleAnalytics(() => {
      gtag('consent', 'update', {
        'ad_personalization': 'granted'
      });
    });
  } else {
    gtag('consent', 'update', {
      'ad_personalization': 'granted'
    });
  }
}

function consentGrantedAnalyticsStorage() {
  if (!gtagLoaded) {
    loadGoogleAnalytics(() => {
      gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    });
  } else {
    gtag('consent', 'update', {
      'analytics_storage': 'granted'
    });
  }
}

function consentGrantedAll() {
  if (!gtagLoaded) {
    loadGoogleAnalytics(() => {
      gtag('consent', 'update', {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'analytics_storage': 'granted'
      });
    });
  } else {
    gtag('consent', 'update', {
      'ad_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted',
      'analytics_storage': 'granted'
    });
  }
}

function consentDeniedAll() {
}

// Restore consent state on page load
function restoreConsentState() {
  const consent = localStorage.getItem('cookie-consent');
  if (consent && consent !== 'none') {
    // Load Google Analytics if user has consented (not rejected)
    if (consent === 'all' || consent === 'analytics') {
      loadGoogleAnalytics(() => {
        if (consent === 'all') {
          gtag('consent', 'update', {
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted',
            'analytics_storage': 'granted'
          });
        } else if (consent === 'analytics') {
          gtag('consent', 'update', {
            'analytics_storage': 'granted'
          });
        }
      });
    }
  }
}

// Make functions globally available
window.consentGrantedAdStorage = consentGrantedAdStorage;
window.consentGrantedAdUserData = consentGrantedAdUserData;
window.consentGrantedAdPersonalization = consentGrantedAdPersonalization;
window.consentGrantedAnalyticsStorage = consentGrantedAnalyticsStorage;
window.consentGrantedAll = consentGrantedAll;
window.consentDeniedAll = consentDeniedAll;
window.loadGoogleAnalytics = loadGoogleAnalytics;

// Cookie Consent Banner Management
function createConsentButton(text, onClick, className = '') {
  const button = document.createElement('button');
  button.innerText = text;
  button.style.backgroundColor = 'var(--active-color)';
  button.style.color = 'var(--text-color)';
  button.style.border = 'none';
  button.style.padding = '8px 16px';
  button.style.margin = '0 5px';
  button.style.borderRadius = '4px';
  button.style.cursor = 'pointer';
  button.style.fontSize = '14px';
  if (className) {
    button.className = className;
  }
  button.addEventListener('click', onClick);
  return button;
}

function createConsentBanner() {
  const banner = document.createElement('div');
  banner.id = 'cookie-consent-banner';
  banner.style.display = 'none';
  banner.style.position = 'fixed';
  banner.style.zIndex = '9';
  banner.style.bottom = '0';
  banner.style.left = '0';
  banner.style.width = '100%';
  banner.style.backgroundColor = 'var(--cookie-noty-bg-color)';
  banner.style.color = 'var(--cookie-noty-text-color)';
  banner.style.borderTop = '1px solid var(--border-color)';
  banner.style.boxShadow = '0 -2px 10px rgba(0,0,0,0.1)';

  const content = document.createElement('div');
  content.style.display = 'flex';
  content.style.justifyContent = 'space-between';
  content.style.alignItems = 'center';
  content.style.flexWrap = 'wrap';
  content.style.padding = '20px';
  content.style.gap = '10px';

  const textDiv = document.createElement('div');
  textDiv.innerHTML = '<p style="margin: 0;">We use cookies to enhance your experience. Please choose your preferences:</p>';

  const buttonsDiv = document.createElement('div');
  buttonsDiv.style.display = 'flex';
  buttonsDiv.style.gap = '10px';
  buttonsDiv.style.flexWrap = 'wrap';

  const acceptAllBtn = createConsentButton('Accept All', () => {
    consentGrantedAll();
    localStorage.setItem('cookie-consent', 'all');
    hideConsentBanner();
  }, 'accept-all');

  const analyticsOnlyBtn = createConsentButton('Analytics Only', () => {
    consentGrantedAnalyticsStorage();
    localStorage.setItem('cookie-consent', 'analytics');
    hideConsentBanner();
  }, 'accept-analytics');

  const rejectAllBtn = createConsentButton('Reject All', () => {
    consentDeniedAll();
    localStorage.setItem('cookie-consent', 'none');
    hideConsentBanner();
  }, 'reject-all');

  buttonsDiv.appendChild(acceptAllBtn);
  buttonsDiv.appendChild(analyticsOnlyBtn);
  buttonsDiv.appendChild(rejectAllBtn);

  content.appendChild(textDiv);
  content.appendChild(buttonsDiv);
  banner.appendChild(content);

  return banner;
}

function hasUserConsented() {
  const consent = localStorage.getItem('cookie-consent');
  // Show banner again if user rejected (consent === 'none') or hasn't made a choice
  return consent !== null && consent !== 'none';
}

function showConsentBanner() {
  const banner = document.getElementById('cookie-consent-banner');
  if (banner) {
    banner.style.display = 'block';
  }
}

function hideConsentBanner() {
  const banner = document.getElementById('cookie-consent-banner');
  if (banner) {
    banner.style.display = 'none';
  }
}

// Initialize consent banner
const consentBanner = createConsentBanner();
document.body.appendChild(consentBanner);

// Restore consent state if user has already consented
restoreConsentState();

// Show banner if user hasn't consented yet
if (!hasUserConsented()) {
  // Show banner after a short delay to ensure page is loaded
  setTimeout(() => {
    showConsentBanner();
  }, 1000);
}
