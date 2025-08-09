// ===== UI Elements =====
function createUpdateButton() {
  const button = document.createElement('button');
  button.innerText = 'New version available! Click to update.';
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

function createUpdateBanner() {
  const banner = document.createElement('div');
  banner.id = 'pwa-update-banner';
  banner.style.display = 'none';
  banner.style.backgroundColor = 'var(--active-color)';
  banner.style.position = 'fixed';
  banner.style.zIndex = '9999';
  banner.style.bottom = '0';
  banner.style.left = '0';
  banner.style.width = '100%';
  banner.style.paddingBottom = 'env(safe-area-inset-bottom)';

  return banner;
}

// ===== Backup Logic (exactly как у тебя) =====
function downloadBackupDirectlyIndexDB() {
  const dbName = 'lasagna-db';
  const request = indexedDB.open(dbName);
  request.onsuccess = function (event) {
    const db = event.target.result;

    const storeNames = Array.from(db.objectStoreNames).filter(store => store !== 'indicesStore');
    const transaction = db.transaction(storeNames, 'readonly');
    const backup = {};

    storeNames.forEach(store => {
      const objectStore = transaction.objectStore(store);
      const getAllRequest = objectStore.getAll();

      getAllRequest.onsuccess = function (event) {
        backup[store] = {
          data: event.target.result,
          version: db.version,
          createdAt: Date.now(),
          store: store
        };

        if (Object.keys(backup).length === storeNames.length) {
          downloadBackup(backup);
          setLastBackupDate();
        }
      };
    });
  };
}

function setLastBackupDate() {
  const lastBackupDate = Date.now()
  localStorage.setItem('lastBackupDate', String(lastBackupDate));
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
// ===== end backup =====

// ===== Dialog / banner setup =====
const reloadTimeout = 5000;
const reloadTimeoutInSeconds = reloadTimeout / 1000;
let secondsLeft = reloadTimeoutInSeconds;

function dialog() {
  const dialog = document.createElement('dialog');
  dialog.innerHTML = `
    <p>New version available!</p>
    <p>We recommend to save a backup of your data before updating.</p>
    <button id="save-backup">Save Backup</button>
    <button id="update-app">Update App without Backup</button>

    <p id="update-timeout-label" style="display: none">Will be updated in <span id="seconds-left">${reloadTimeoutInSeconds}</span> seconds</p>
  `;
  document.body.appendChild(dialog);

  const saveBackupButton = dialog.querySelector('#save-backup');

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

// ===== Service Worker / update logic (independent от Angular) =====
if ('serviceWorker' in navigator) {
  let newWorker = null;

  navigator.serviceWorker.getRegistration().then(reg => {
    if (!reg) return;

    // Если воркер уже в состоянии waiting (уже установлен и ждёт активации),
    // покажем баннер сразу
    if (reg.waiting) {
      banner.style.display = 'flex';
      newWorker = reg.waiting;
    }

    // Ловим появление нового installing воркера
    reg.addEventListener('updatefound', () => {
      newWorker = reg.installing;
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // new version installed and there's an active controller => show banner
          banner.style.display = 'flex';
        }
      });
    });
  }).catch(() => {
    // ignore registration errors here
  });

  // Нажатие на "Update App without Backup"
  updateDialog.querySelector('#update-app').addEventListener('click', () => {
    if (newWorker) {
      // Просим воркер активироваться прямо сейчас (ожидается ключ type)
      newWorker.postMessage({ type: 'SKIP_WAITING' });
    }

    updateTimeoutLabel.style.display = 'block';
    updateDialog.querySelector('#update-app').style.display = 'none';

    const interval = setInterval(() => {
      if (secondsLeft <= 0) {
        clearInterval(interval);
        return;
      }
      secondsLeft -= 1;
      secondLeftContainer.innerText = String(secondsLeft);
    }, 1000);

    setTimeout(() => {
      window.location.reload();
    }, reloadTimeout);
  });

  // Когда контроллер поменялся — перезагружаем, чтобы загрузить новую версию
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    window.location.reload();
  });
}
