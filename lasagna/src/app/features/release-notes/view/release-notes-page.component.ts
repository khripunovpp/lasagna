import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {ReleaseNotesService} from '../release-notes.service';
import {ContainerComponent} from '../../../shared/view/layout/container.component';
import {TitleComponent} from '../../../shared/view/layout/title.component';
import {FadeInComponent} from '../../../shared/view/ui/fade-in.component';
import {TranslatePipe} from '@ngx-translate/core';
import {CardComponent} from '../../../shared/view/ui/card/card.component';

@Component({
  selector: 'lg-release-notes-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lg-fade-in>
      <lg-container>
        <lg-title>{{ 'release-notes.page.title' | translate }}</lg-title>

        @for (note of sortedNotes(); track note.date) {
          <lg-card>
            <div class="rn-entry">
              <h3 class="rn-entry__date">{{ note.date }}</h3>
              <ul class="rn-entry__list">
                @for (feature of note.features; track feature) {
                  <li>{{ feature }}</li>
                }
              </ul>
            </div>
          </lg-card>
        } @empty {
          <p>{{ 'release-notes.page.empty' | translate }}</p>
        }
      </lg-container>
    </lg-fade-in>
  `,
  styles: `
    .rn-entry__date {
      margin: 0 0 8px;
      font-size: 16px;
    }

    .rn-entry__list {
      margin: 0;
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
  `,
  imports: [ContainerComponent, TitleComponent, FadeInComponent, TranslatePipe, CardComponent],
})
export class ReleaseNotesPageComponent {
  private readonly _releaseNotesService = inject(ReleaseNotesService);

  readonly sortedNotes = computed(() =>
    [...this._releaseNotesService.allNotes()].sort((a, b) => b.date.localeCompare(a.date))
  );
}