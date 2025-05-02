function createUpdateButton() {
  const button = document.createElement('button');
  button.innerText = 'New version available! Click to update.';
  button.style.backgroundColor = '#007bff';
  button.style.color = 'white';
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
  console.log('Backup downloaded successfully');
}

function createUpdateBanner() {
  const banner = document.createElement('div');
  banner.id = 'pwa-update-banner';
  banner.style.display = 'none';
  banner.style.position = 'fixed';
  banner.style.bottom = 'env(safe-area-inset-bottom)';
  banner.style.left = '0';
  banner.style.width = '100%';

  return banner;
}

function dialog() {
  const dialog = document.createElement('dialog');
  dialog.innerHTML = `
    <p>New version available!</p>
    <p>We recommend to save a backup of your data before updating.</p>
    <button id="save-backup">Save Backup</button>
    <button id="update-app">Update App without Backup</button>
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

// banner.style.display = 'flex';


// 🔥 Прямая логика обновления PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(registration => {
    // Периодически обновляем воркер вручную
    setInterval(() => registration.update(), 60_000);

    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;

      newWorker?.addEventListener('statechange', () => {
        if (
          newWorker.state === 'installed' &&
          navigator.serviceWorker.controller // текущий есть => новая версия ждёт
        ) {
          // Показать баннер
          banner.style.display = 'flex';

          const updateAppButton = updateDialog.querySelector('#update-app');
          updateAppButton.addEventListener('click', () => {
            if (registration.waiting) {
              registration.waiting.postMessage({type: 'SKIP_WAITING'});
            }
          });
        }
      });
    });
  });

  // Перезагрузка при активации новой версии
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('Service worker updated.');
    window.location.reload();
  });

  let currentWorker = null;

  const updateController = () => {
    const {controller} = navigator.serviceWorker;
    if (controller === null) {
      return;
    }
    currentWorker = controller;
    console.log('Current worker:', currentWorker);
  };
  navigator.serviceWorker.addEventListener('controllerchange', updateController);
  updateController();


  const messageListener = (event) => {
    console.log({
      event,
    })
  };
  navigator.serviceWorker.addEventListener('message', messageListener);

}
