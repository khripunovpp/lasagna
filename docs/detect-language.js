// Language detection script - loads before Angular
// Determines browser language and sets it globally for other scripts

(function() {
  'use strict';
  
  const SUPPORTED_LANGUAGES = ['en', 'ru', 'pt'];
  const DEFAULT_LANGUAGE = 'en';
  
  function detectBrowserLanguage() {
    // Get browser language
    const browserLang = navigator.language || navigator.userLanguage || DEFAULT_LANGUAGE;
    
    // Extract language code (e.g., 'en-US' -> 'en')
    const langCode = browserLang.toLowerCase().split('-')[0];
    
    // Check if supported
    return SUPPORTED_LANGUAGES.includes(langCode) ? langCode : DEFAULT_LANGUAGE;
  }
  
  function initializeLanguage() {
    // Check if language is already set (by Angular or user)
    const existingLang = localStorage.getItem('lang');
    
    if (existingLang && SUPPORTED_LANGUAGES.includes(existingLang)) {
      // Language already set and valid
      window.__DETECTED_LANG__ = existingLang;
      return existingLang;
    }
    
    // Detect and set browser language
    const detectedLang = detectBrowserLanguage();
    
    // Set in localStorage for consistency
    localStorage.setItem('lang', detectedLang);
    
    // Set global variable for immediate access
    window.__DETECTED_LANG__ = detectedLang;
    
    console.log(`🌐 Language detected and set: ${detectedLang}`);
    return detectedLang;
  }
  
  // Initialize immediately
  const currentLang = initializeLanguage();
  
  // Set HTML lang attribute
  if (document.documentElement) {
    document.documentElement.setAttribute('lang', currentLang);
  }
  
  // Export helper function for other scripts
  window.getCurrentLanguage = function() {
    return window.__DETECTED_LANG__ || localStorage.getItem('lang') || DEFAULT_LANGUAGE;
  };
  
})();
