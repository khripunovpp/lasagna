import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {SettingsService} from '../settings/service/services/settings.service';
import {SettingsKeysConst} from '../settings/const/settings-keys.const';
import {APP_SERVER_IS_RU} from '../../shared/service/tokens/app-server-region.token';

export interface ReleaseNote {
  date: string;
  features: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ReleaseNotesService {
  private readonly _http = inject(HttpClient);
  private readonly _isRu = inject(APP_SERVER_IS_RU);
  private readonly _settingsService = inject(SettingsService);

  readonly allNotes = signal<ReleaseNote[]>([]);
  private readonly _lastSeenDate = signal<string | null>(null);

  readonly latestUnreadNote = computed(() => {
    const notes = this.allNotes();
    const lastSeenDate = this._lastSeenDate();
    if (!notes.length) return null;
    const sorted = [...notes].sort((a, b) => b.date.localeCompare(a.date));
    if (!lastSeenDate) return sorted[0];
    return sorted.find(n => n.date > lastSeenDate) ?? null;
  });

  readonly hasUnread = computed(() => !!this.latestUnreadNote());

  async init() {
    const lastSeen = this._settingsService.settingsSignal()
      ?.getSetting<string>(SettingsKeysConst.seenReleaseNotes)?.data ?? null;
    this._lastSeenDate.set(lastSeen);

    try {
      const year = new Date().getFullYear();
      const region = this._isRu ? 'ru' : 'global';
      const data = await firstValueFrom(
        this._http.get<{ notes: ReleaseNote[] }>(`./release-notes/release-notes-${region}-${year}.json`)
      );
      this.allNotes.set(data.notes ?? []);
    } catch(e) {
      console.error(e)
      // release notes are non-critical
    }
  }

  markRead(date: string) {
    const current = this._lastSeenDate();
    if (current && current >= date) return;

    this._lastSeenDate.set(date);
    this._settingsService.settingsModel?.addSetting(SettingsKeysConst.seenReleaseNotes, date);
    this._settingsService.saveSettings();
  }
}
