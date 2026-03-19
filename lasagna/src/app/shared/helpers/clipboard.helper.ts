/**
 * Copies text to clipboard.
 * Uses Clipboard API when available, falls back to execCommand for iOS Safari.
 * Must be called directly inside a user gesture handler (click) to work on iOS.
 */
export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    document.execCommand('copy');
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  } finally {
    document.body.removeChild(textarea);
  }
}
