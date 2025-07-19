// Google Analytics Consent Management Functions
function consentGrantedAdStorage() {
  gtag('consent', 'update', {
    'ad_storage': 'granted'
  });
}

function consentGrantedAdUserData() {
  gtag('consent', 'update', {
    'ad_user_data': 'granted'
  });
}

function consentGrantedAdPersonalization() {
  gtag('consent', 'update', {
    'ad_personalization': 'granted'
  });
}

function consentGrantedAnalyticsStorage() {
  gtag('consent', 'update', {
    'analytics_storage': 'granted'
  });
}

function consentGrantedAll() {
  gtag('consent', 'update', {
    'ad_storage': 'granted',
    'ad_user_data': 'granted',
    'ad_personalization': 'granted',
    'analytics_storage': 'granted'
  });
}

function consentDeniedAll() {
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
  banner.style.backgroundColor = 'var(--background-color)';
  banner.style.color = 'var(--text-color)';
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
  textDiv.innerHTML = '<p style="margin: 0;">Мы используем cookies для улучшения вашего опыта. Выберите ваши предпочтения:</p>';

  const buttonsDiv = document.createElement('div');
  buttonsDiv.style.display = 'flex';
  buttonsDiv.style.gap = '10px';
  buttonsDiv.style.flexWrap = 'wrap';

  const acceptAllBtn = createConsentButton('Принять все', () => {
    consentGrantedAll();
    localStorage.setItem('cookie-consent', 'all');
    hideConsentBanner();
  }, 'accept-all');

  const analyticsOnlyBtn = createConsentButton('Только аналитика', () => {
    consentGrantedAnalyticsStorage();
    localStorage.setItem('cookie-consent', 'analytics');
    hideConsentBanner();
  }, 'accept-analytics');

  const rejectAllBtn = createConsentButton('Отклонить все', () => {
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
  return localStorage.getItem('cookie-consent') !== null;
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

// Show banner if user hasn't consented yet
if (!hasUserConsented()) {
  // Show banner after a short delay to ensure page is loaded
  setTimeout(() => {
    showConsentBanner();
  }, 1000);
}
