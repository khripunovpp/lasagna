# Translation System for JavaScript Files

## Overview

This system provides build-time translation injection for JavaScript files with early language detection, preventing runtime loading and global scope conflicts.

## Components

### 1. Language Detection (`detect-language.js`)
Runs **before Angular loads** to:
- Detect browser language (`navigator.language`)
- Set initial language in localStorage
- Provide global `getCurrentLanguage()` function
- Set HTML `lang` attribute immediately

### 2. Translation Injection (`inject-translations.js`)
Build script that:
- Reads translation files from `public/i18n/`
- Extracts required keys for each target file
- Uses `// START TRANSLATIONS` and `// END TRANSLATIONS` markers
- Safely replaces content between markers
- Injects translations as scoped functions
- Prevents global scope conflicts

## Architecture

### Language Priority Chain
Translation functions use this priority order:
1. `window.getCurrentLanguage()` (from detect-language.js)
2. `localStorage.getItem('lang')` (fallback)
3. `'en'` (default fallback)

### Loading Order
```html
<script src="detect-language.js"></script>         <!-- 1. Early detection -->
<script src="pwa-update-compoent.js"></script>     <!-- 2. Uses detected language -->
<script src="google-analytics-consent.js"></script><!-- 3. Uses detected language -->
```

### Generated Code Structure
```javascript
// START TRANSLATIONS
// Auto-generated translations - DO NOT EDIT MANUALLY
function getTranslation(key, params = {}) {
  const TRANSLATIONS = {
    "en": { "key": "English text" },
    "ru": { "key": "Русский текст" },
    "pt": { "key": "Texto português" }
  };
  
  // Get language with fallback chain
  const lang = (typeof window !== 'undefined' && window.getCurrentLanguage) 
    ? window.getCurrentLanguage()
    : (localStorage.getItem('lang') || 'en');
    
  const translation = TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en']?.[key] || key;
  
  // Replace parameters in translation
  let result = translation;
  Object.keys(params).forEach(param => {
    result = result.replace(new RegExp(\`{\${param}}\`, 'g'), params[param]);
  });
  
  return result;
}
// END TRANSLATIONS
```

### Marker System
Each target JavaScript file contains markers:
- `// START TRANSLATIONS` - Beginning of translation section
- `// END TRANSLATIONS` - End of translation section

The injection script safely replaces everything between these markers, ensuring:
- ✅ **No duplication** - Previous translations are completely removed
- ✅ **No conflicts** - Only designated areas are modified
- ✅ **Reliable updates** - Markers provide precise boundaries
- ✅ **Safe operation** - Original code outside markers is preserved

## Benefits

- ✅ **Early language detection** - works before Angular loads
- ✅ **No runtime loading** - translations embedded at build time
- ✅ **No global conflicts** - TRANSLATIONS scoped inside functions
- ✅ **Parameter support** - `{param}` replacement works
- ✅ **Robust fallback** - browser → localStorage → English → key
- ✅ **HTML lang sync** - sets document language attribute
- ✅ **Angular integration** - syncs with app settings

## Usage

### Automatic (during build)
```bash
npm run build  # includes prebuild → inject-translations.js
```

### Manual
```bash
npm run inject-translations
```

## Target Files & Translation Keys

### google-analytics-consent.js
- `cookies.banner.text`
- `cookies.banner.accept-all`
- `cookies.banner.analytics-only`
- `cookies.banner.reject-all`

### pwa-update-compoent.js
- `pwa.update.banner-text`
- `pwa.update.dialog.title`
- `pwa.update.dialog.description`
- `pwa.update.dialog.save-backup`
- `pwa.update.dialog.update-without-backup`
- `pwa.update.dialog.timeout`

## Language Synchronization Flow

1. **Page Load**: `detect-language.js` detects browser language
2. **Early Scripts**: JS files use detected language immediately
3. **Angular Load**: App reads language from localStorage
4. **User Changes**: Angular syncs new language to localStorage
5. **Script Updates**: JS files automatically use new language

This ensures consistent language experience from the very first moment!
