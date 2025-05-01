
function createUpdateButton() {
  const button = document.createElement('button');
  button.innerText = 'Обновить приложение';
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
    <p>Обновление доступно. Хотите обновить приложение?</p>
    <button id="save-backup">Сохранить бэкап</button>
    <button id="update-app">Обновить приложение</button>
  `;
  document.body.appendChild(dialog);

  const saveBackupButton = dialog.querySelector('#save-backup');

  saveBackupButton.addEventListener('click', (e) => {
    const url = `${window.location.origin}/settings?download_backup=true`;
    window.history.pushState({}, '', url);
    window.dispatchEvent(new PopStateEvent('popstate'));
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
if ('serviceWorker' in navigator && 'Notification' in window) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.getRegistration().then(reg => {
      console.log('Service worker registration:', reg);
      if (!reg || !reg.waiting) return;

      // Показать баннер
      banner.style.display = 'flex';

      const updateAppButton = dialog.querySelector('#update-app');

      updateAppButton.addEventListener('click', () => {
        reg.waiting.postMessage({type: 'SKIP_WAITING'});
        window.location.reload();
      });
    });

    // Слушаем обновление
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('Service worker updated.');
    });
  });
}
