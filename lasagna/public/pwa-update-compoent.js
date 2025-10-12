// START TRANSLATIONS

// Auto-generated translations - DO NOT EDIT MANUALLY
function getTranslation(key, params = {}) {
  const TRANSLATIONS = {
    "en": {
      "pwa.update.banner-text": "New version available! Click to update.",
      "pwa.update.dialog.title": "New version available!",
      "pwa.update.dialog.description": "We recommend to save a backup of your data before updating. Sometimes the app doesn't update on the first try, so you can just do nothing and it will update automatically anyway.",
      "pwa.update.dialog.save-backup": "Save Backup",
      "pwa.update.dialog.update-without-backup": "Update App without Backup",
      "pwa.update.dialog.timeout": "Will be updated in {seconds} seconds",
      "pwa.update.dialog.close-btn": "Close without updating"
    },
    "ru": {
      "pwa.update.banner-text": "Доступна новая версия! Нажмите для обновления.",
      "pwa.update.dialog.title": "Доступна новая версия!",
      "pwa.update.dialog.description": "Рекомендуем сохранить резервную копию данных перед обновлением. Иногда приложение не обновляется с первого раза, поэтому вы спокойно можете ничего не делать и оно все равно обновится автоматически.",
      "pwa.update.dialog.save-backup": "Сохранить резервную копию",
      "pwa.update.dialog.update-without-backup": "Обновить без резервной копии",
      "pwa.update.dialog.timeout": "Обновление через {seconds} секунд",
      "pwa.update.dialog.close-btn": "Закрыть без обновления"
    },
    "pt": {
      "pwa.update.banner-text": "Nova versão disponível! Clique para atualizar.",
      "pwa.update.dialog.title": "Nova versão disponível!",
      "pwa.update.dialog.description": "Recomendamos salvar um backup dos seus dados antes de atualizar. Às vezes, o aplicativo não atualiza na primeira tentativa, então você pode ficar tranquilo e não fazer nada; ele será atualizado automaticamente.",
      "pwa.update.dialog.save-backup": "Salvar Backup",
      "pwa.update.dialog.update-without-backup": "Atualizar sem Backup",
      "pwa.update.dialog.timeout": "Será atualizado em {seconds} segundos",
      "pwa.update.dialog.close-btn": "Fechar sem atualizar"
    }
  };

  // Get language with fallback chain
  const lang = (typeof window !== 'undefined' && window.getCurrentLanguage)
    ? window.getCurrentLanguage()
    : (localStorage.getItem('lang') || 'en');

  const translation = TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en']?.[key] || key;

  // Replace parameters in translation
  let result = translation;
  Object.keys(params).forEach(param => {
    result = result.replace(new RegExp(`{${param}}`, 'g'), params[param]);
  });

  return result;
}

// END TRANSLATIONS

function createUpdateButton() {
  const button = document.createElement('button');
  button.innerText = getTranslation('pwa.update.banner-text');
  button.style.backgroundColor = 'var(--active-color)';
  button.style.color = 'var(--text-color)';
  button.style.border = 'none';
  button.style.padding = '10px 20px';
  button.style.cursor = 'pointer';
  button.style.width = '100%';
  button.addEventListener('click', () => {
    updateDialog.showModal();
  });
  return button;
}

function downloadBackupDirectlyIndexDB() {
  const dbName = 'lasagna-db';
  const request = indexedDB.open(dbName);
  request.onsuccess = function (event) {
    const db = event.target.result;
    const storeNames = Array.from(db.objectStoreNames).filter(store => store !== 'indicesStore');
    const transaction = db.transaction(storeNames, 'readonly');
    const backup = [];
    storeNames.forEach(store => {
      const objectStore = transaction.objectStore(store);
      const getAllRequest = objectStore.getAll();

      getAllRequest.onsuccess = function (event) {
        backup.push({
          store,
          data: event.target.result,
          version: db.version,
          createdAt: Date.now(),
        });

        if (backup.length === storeNames.length) {
          downloadBackup(backup);
          setLastBackupDate();
        } else {
          console.log(`Backup progress: ${backup.length}/${storeNames.length} stores backed up.`);
        }
      };
    });
  };
}

function setLastBackupDate() {
  try {
    const lastBackupDate = Date.now()
    localStorage.setItem('lastBackupDate', String(lastBackupDate));
  } catch (e) {
    console.error('Error setting last backup date', e);
  }
}

function downloadBackup(data) {
  const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.download = 'backup.json';
  a.href = url;
  a.click();
  URL.revokeObjectURL(url);
}

function createUpdateBanner() {
  const banner = document.createElement('div');
  banner.id = 'pwa-update-banner';
  banner.style.display = 'none';
  banner.style.backgroundColor = 'var(--active-color)';
  banner.style.position = 'fixed';
  banner.style.zIndex = '8';
  banner.style.bottom = '0';
  banner.style.left = '0';
  banner.style.width = '100%';
  banner.style.paddingBottom = 'env(safe-area-inset-bottom)';
  return banner;
}

const reloadTimeout = 5000;
const reloadTimeoutInSeconds = reloadTimeout / 1000;
let secondsLeft = reloadTimeoutInSeconds;

function dialog() {
  const dialog = document.createElement('dialog');
  const dialogStyles = `
    border: none;
    backdrop-filter: blur(4px);
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 32px;
    padding: 32px;
    box-shadow: 0 4px 6px rgba(0, 0,
  0, 0.1);
    max-width: 800px;
    width: 90%;
    text-align: center;
    font-family: Arial, sans-serif;
    color: var(--text-color);

    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
    justify-content: center;
  `;
  dialog.style.cssText = dialogStyles;
  dialog.innerHTML = `
    <b>${getTranslation('pwa.update.dialog.title')}</b>
    <p style="width: 100%">${getTranslation('pwa.update.dialog.description')}</p>

    <button id="save-backup">${getTranslation('pwa.update.dialog.save-backup')}</button>
    <button id="update-app">${getTranslation('pwa.update.dialog.update-without-backup')}</button>
    <button id="close-btn">${getTranslation('pwa.update.dialog.close-btn')}</button>

    <p id="update-timeout-label" style="margin: 0;display: none">
      ${getTranslation('pwa.update.dialog.timeout', {seconds: '<span id="seconds-left">' + reloadTimeoutInSeconds + '</span>'})}
    </p>
  `;
  document.body.appendChild(dialog);
  const buttonStyles = `
    background-color: var(--button-primary-bg);
    color: var(--button-primary-text);
    border: 1px solid var(--button-primary-bg);
    border-radius: 16px;
    padding: 12px 24px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    appearance: none;
    margin: 8px;
    font-family: inherit;
    font-size: inherit;
  `;

  const updateAppButtonStyles = `
    ${buttonStyles}
    background-color: transparent;
    color: var(--text-color);
  `;

  const closeButtonStyles = `
    ${buttonStyles}
    background-color: transparent;
    border: none;
    color: var(--text-color);
  `;

  const updateAppButton = dialog.querySelector('#update-app');
  updateAppButton.style.cssText = updateAppButtonStyles;
  const saveBackupButton = dialog.querySelector('#save-backup');
  saveBackupButton.style.cssText = buttonStyles;
  const closeButton = dialog.querySelector('#close-btn');
  closeButton.style.cssText = closeButtonStyles;
  closeButton.addEventListener('click', () => {
    dialog.close();
    banner.style.display = 'none';
  });
  saveBackupButton.addEventListener('click', (e) => {
    downloadBackupDirectlyIndexDB();
  });
  return dialog;
}

const banner = createUpdateBanner();
document.body.appendChild(banner);
const updateButton = createUpdateButton();
banner.appendChild(updateButton);
const updateDialog = dialog();
document.body.appendChild(updateDialog);
const secondLeftContainer = updateDialog.querySelector('#seconds-left');
const updateTimeoutLabel = updateDialog.querySelector('#update-timeout-label');
if ('serviceWorker' in navigator) {
  let currentWorker = null;
  const updateController = () => {
    const {controller} = navigator.serviceWorker;
    if (controller === null) {
      return;
    }
    currentWorker = controller;
    currentWorker.postMessage({
      action: 'CHECK_FOR_UPDATES',
      nonce: Math.random(),
    })
  };
  const messageListener = (event) => {
    const versionDetected = event?.data?.type === "VERSION_READY";

    if (!versionDetected) return;
    banner.style.display = 'flex';
    const updateAppButton = updateDialog.querySelector('#update-app');
    const closeButton = updateDialog.querySelector('#close-btn');
    updateAppButton.addEventListener('click', () => {
      if (currentWorker) {
        currentWorker.postMessage({type: 'SKIP_WAITING'});
        currentWorker.postMessage({action: 'SKIP_WAITING'});
        currentWorker.postMessage({
          action: 'ACTIVATE_UPDATE',
          nonce: event.data?.nonce,
        });
      }
      updateTimeoutLabel.style.display = 'block';
      updateAppButton.style.display = 'none';
      closeButton.style.display = 'none';
      const interval = setInterval(() => {
        if (secondsLeft <= 0) {
          clearInterval(interval);
          return;
        }
        secondLeftContainer.innerText = String(secondsLeft - 1);
        secondsLeft -= 1;
      }, 1000);
      setTimeout(() => {
        window.location.reload();
      }, reloadTimeout);
    });
  };
  navigator.serviceWorker.addEventListener('controllerchange', updateController);
  updateController();
  setInterval(() => updateController(), 60_000);
  navigator.serviceWorker.addEventListener('message', messageListener);
}
