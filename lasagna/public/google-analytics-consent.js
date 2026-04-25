// START TRANSLATIONS

// Auto-generated translations - DO NOT EDIT MANUALLY
function getTranslation(key, params = {}) {
  const TRANSLATIONS = {
  "en": {
    "cookies.banner.text": "We use cookies to enhance your experience. Please choose your preferences:",
    "cookies.banner.accept-all": "Accept All",
    "cookies.banner.analytics-only": "Analytics Only",
    "cookies.banner.reject-all": "Reject All"
  },
  "ru": {
    "cookies.banner.text": "Мы используем файлы cookie для улучшения вашего опыта. Пожалуйста, выберите ваши предпочтения:",
    "cookies.banner.accept-all": "Принять все",
    "cookies.banner.analytics-only": "Только аналитика",
    "cookies.banner.reject-all": "Отклонить все"
  },
  "pt": {
    "cookies.banner.text": "Usamos cookies para melhorar sua experiência. Por favor, escolha suas preferências:",
    "cookies.banner.accept-all": "Aceitar Todos",
    "cookies.banner.analytics-only": "Apenas Análises",
    "cookies.banner.reject-all": "Rejeitar Todos"
  }
};
  let lang = 'en';

  try {
    // Get language with fallback chain
    lang = (typeof window !== 'undefined' && window.getCurrentLanguage)
      ? window.getCurrentLanguage()
      : (localStorage.getItem('lang') || 'en');
  } catch (e) {
    console.log('e', e);
  }

  const translation = TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en']?.[key] || key;

  // Replace parameters in translation
  let result = translation;
  Object.keys(params).forEach(param => {
    result = result.replace(new RegExp(`{${param}}`, 'g'), params[param]);
  });

  return result;
}
// END TRANSLATIONS

// Google Analytics Configuration
const GA_TRACKING_ID = 'G-GWN769JKRP';
window.gtagLoaded = false;

function shouldSkipGa() {
  try {
    const devEnv = localStorage.getItem('dev-mode') === 'true'
      || window.location.hostname === 'localhost';
    const devSettings = JSON.parse(localStorage.getItem('dev_settings') || '{}');
    if (devSettings['ga_analytics_disabled']) return true;
    if (devEnv) return true;
    // Explicit rejection — respect it on subsequent visits (no cookieless pings either)
    if (localStorage.getItem('cookie-consent') === 'none') return true;
    return false;
  } catch (e) {
    return false;
  }
}

// Capture UTM / gclid / Telegram start_param into sessionStorage BEFORE Angular
// hydration can rewrite the URL. Used to enrich manual page_view events later.
function captureCampaignParams() {
  try {
    const url = new URL(window.location.href);
    const keys = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','utm_id','gclid','gbraid','wbraid'];
    const stored = JSON.parse(sessionStorage.getItem('ga_campaign') || '{}');
    let updated = false;
    keys.forEach(k => {
      const v = url.searchParams.get(k);
      if (v && !stored[k]) { stored[k] = v; updated = true; }
    });
    const tgParam = window.Telegram && window.Telegram.WebApp
      && window.Telegram.WebApp.initDataUnsafe
      && window.Telegram.WebApp.initDataUnsafe.start_param;
    if (tgParam && !stored.utm_source) {
      stored.utm_source = 'telegram';
      stored.utm_medium = 'miniapp';
      stored.utm_campaign = tgParam;
      updated = true;
    }
    if (updated) sessionStorage.setItem('ga_campaign', JSON.stringify(stored));
  } catch (e) {}
}

window.getCampaignParams = function () {
  try { return JSON.parse(sessionStorage.getItem('ga_campaign') || '{}'); }
  catch (e) { return {}; }
};

// Set up dataLayer + consent default BEFORE gtag.js arrives, so the very first
// session_start (which fires when gtag.js loads) sees the right consent state.
function bootstrapGtag() {
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'wait_for_update': 500
  });

  // Promote saved consent BEFORE config so the first session_start has it
  const saved = getUserConsent();
  if (saved === 'all') {
    gtag('consent', 'update', {
      'ad_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted',
      'analytics_storage': 'granted'
    });
  } else if (saved === 'analytics') {
    gtag('consent', 'update', { 'analytics_storage': 'granted' });
  }

  // Keep gclid/UTM across SPA navigations; redact ads data while denied.
  gtag('set', 'url_passthrough', true);
  gtag('set', 'ads_data_redaction', true);

  gtag('js', new Date());
  gtag('config', GA_TRACKING_ID, {
    send_page_view: false
  });
}

// Dynamic Google Analytics loader
function loadGoogleAnalytics(callback = () => {}) {
  if (window.gtagLoaded) {
    if (typeof callback === 'function') callback();
    return;
  }
  if (shouldSkipGa()) {
    console.warn('!!!___GA skip___!!!');
    return;
  }

  bootstrapGtag();

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  script.onload = function () {
    window.gtagLoaded = true;
    console.log('Google Analytics loaded dynamically');
    if (typeof callback === 'function') callback();
  };
  document.head.appendChild(script);
}

// Consent updates. gtag is already loaded with default=denied (or skipped on
// localhost / explicit rejection). These just push the update.
function consentGrantedAdStorage() {
  if (!window.gtag) return;
  gtag('consent', 'update', { 'ad_storage': 'granted' });
}

function consentGrantedAdUserData() {
  if (!window.gtag) return;
  gtag('consent', 'update', { 'ad_user_data': 'granted' });
}

function consentGrantedAdPersonalization() {
  if (!window.gtag) return;
  gtag('consent', 'update', { 'ad_personalization': 'granted' });
}

function consentGrantedAnalyticsStorage() {
  if (!window.gtag) return;
  gtag('consent', 'update', { 'analytics_storage': 'granted' });
}

function consentGrantedAll() {
  if (!window.gtag) return;
  gtag('consent', 'update', {
    'ad_storage': 'granted',
    'ad_user_data': 'granted',
    'ad_personalization': 'granted',
    'analytics_storage': 'granted'
  });
}

function consentDeniedAll() {
  // Downgrade if user previously granted on this same page load.
  if (!window.gtag) return;
  gtag('consent', 'update', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied'
  });
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
  textDiv.innerHTML = `<p style="margin: 0;">${getTranslation('cookies.banner.text')}</p>`;
  const buttonsDiv = document.createElement('div');
  buttonsDiv.style.display = 'flex';
  buttonsDiv.style.gap = '10px';
  buttonsDiv.style.flexWrap = 'wrap';
  const acceptAllBtn = createConsentButton(getTranslation('cookies.banner.accept-all'), () => {
    try {
      consentGrantedAll();
      localStorage.setItem('cookie-consent', 'all');
      hideConsentBanner();
    } catch (e) {
      console.log('e', e);
    }
  }, 'accept-all');
  const analyticsOnlyBtn = createConsentButton(getTranslation('cookies.banner.analytics-only'), () => {
    try {
      consentGrantedAnalyticsStorage();
      localStorage.setItem('cookie-consent', 'analytics');
      hideConsentBanner();
    } catch (e) {
      console.log('e', e);
    }
  }, 'accept-analytics');
  const rejectAllBtn = createConsentButton(getTranslation('cookies.banner.reject-all'), () => {
    try {
      consentDeniedAll();
      localStorage.setItem('cookie-consent', 'none');
      hideConsentBanner();
    } catch (e) {
      console.log('e', e);
    }
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
  const consent = getUserConsent();
  // Show banner again if user rejected (consent === 'none') or hasn't made a choice
  return consent !== null && consent !== 'none';
}

function getUserConsent() {
  try {
    return localStorage.getItem('cookie-consent') || 'none';
  } catch (e) {
    console.log('e', e);
    return 'none';
  }
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

// 1. Capture UTM/Telegram start_param BEFORE Angular hydration touches the URL
captureCampaignParams();
// 2. Load gtag immediately with consent default = denied (Google Consent Mode v2).
//    No cookies are set while denied; gtag sends cookieless pings so session_start
//    is captured with correct source/medium even if user clicks Accept later.
loadGoogleAnalytics();
// 3. Banner UI
const consentBanner = createConsentBanner();
document.body.appendChild(consentBanner);
if (!hasUserConsented()) {
  setTimeout(() => {
    showConsentBanner();
  }, 1000);
}
