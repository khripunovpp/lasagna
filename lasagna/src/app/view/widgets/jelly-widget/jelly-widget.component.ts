import {Component, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputComponent} from '../../ui/form/input.component';
import {GapColumnComponent} from '../../ui/layout/gap-column.component';
import {TitleComponent} from '../../ui/layout/title/title.component';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'lg-jelly-widget',
  standalone: true,
  template: `
  <form [formGroup]="gelatinForm" (ngSubmit)="calculate()">
  <label>
    Тип основы:
    <select formControlName="baseType">
      <option value="1">Желатин</option>
      <option value="2">Агар</option>
      <option value="3">Пектин</option>
    </select>
  </label>

  <label>
    Тип пользователя:
    <select formControlName="userType">
      <option value="1">Листовой</option>
      <option value="2">Порошковый</option>
    </select>
  </label>

  <label>
    Крепость пользователя:
    <input type="number" formControlName="userStrength" />
  </label>

  <label>
    Крепость рецепта:
    <input type="number" formControlName="recipeStrength" />
  </label>

  <label>
    Количество в рецепте (грамм):
    <input type="number" formControlName="recipeAmount" />
  </label>

  <label>
    Формула:
    <select formControlName="formulaType">
      <option value="1">Прямая конвертация</option>
      <option value="2">С водой</option>
      <option value="3">Сухая масса</option>
    </select>
  </label>

  <label>
    Тип рецепта:
    <select formControlName="recipeType">
      <option value="1">Обычный</option>
      <option value="2">Дополненный</option>
    </select>
  </label>

  <button type="submit">Рассчитать</button>
</form>

<p>Результат: {{ result }}</p>


  `,
  imports: [
    FormsModule,
    InputComponent,
    GapColumnComponent,
    TitleComponent,
    DecimalPipe,
    ReactiveFormsModule
  ],
  styles: [`
    :host {

      --control-bg: #fcfcfc;
    }

    lg-eggs-widget {
      display: flex;
    }

    .eggs-widget {
      display: flex;
      flex-direction: column;
    }

    .eggs-widget__eggs {
      display: flex;
      align-items: flex-end;
      gap: 8px;
    }

    .eggs-widget__eggs img {
      width: 40px;
    }

    .eggs-widget__egg {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      flex-direction: column;
      white-space: nowrap;
      gap: 8px;
      background-color: var(--control-bg);
      border-radius: 24px;
      padding: 16px;
    }

    .eggs-widget__egg:first-child img {
      transform: scale(0.8);
    }

    .eggs-widget__egg:last-child img {
      transform: scale(1.2);
    }

    .eggs-widget__egg.selected {
      background-color: #61b789;
    }

    .eggs-widget__egg.selected:first-child {
      background-color: #b4b8f8;
    }

    .eggs-widget__egg.selected:last-child {
      background-color: #ff8080;
    }
  `
  ],
  encapsulation: ViewEncapsulation.None,
})
export class JellyWidgetComponent {
  gelatinForm: FormGroup;
  result: string = '';

  constructor(private fb: FormBuilder) {
    this.gelatinForm = this.fb.group({
      baseType: [1], // 1 - Желатин, 2 - Агар, 3 - Пектин
      userType: [1],
      userStrength: [200],
      recipeStrength: [200],
      recipeAmount: [''],
      formulaType: [2], // 1 - Прямая конвертация, 2 - С водой, 3 - Сухая масса
      recipeType: [1] // Добавленный параметр
    });
  }

  calculate() {
    const { baseType, userType, userStrength, recipeStrength, recipeAmount, formulaType, recipeType } = this.gelatinForm.value;
    if (!recipeAmount || recipeAmount <= 0) {
      this.result = '0';
      return;
    }

    let baseAmount = this.convertToBase(baseType, recipeAmount, recipeStrength);
    let convertedResult = (baseAmount * recipeStrength) / userStrength;
    let finalAmount = this.convertFromBase(userType, convertedResult, userStrength);

    // Логика расчета в зависимости от формулы и типа рецепта
    if (formulaType == 2) {
      let waterAmount = this.round(finalAmount * 6);
      this.result = `${this.round(finalAmount)}г желатина + ${waterAmount}г воды`;
    } else if (formulaType == 3) {
      this.result = `${this.round(finalAmount * 7)}г желатина`;
    } else {
      this.result = `${this.round(finalAmount)}г желатина`;
    }
  }

  convertToBase(type: number, amount: number, strength: number): number {
    switch (type) {
      case 1: return amount * this.getLeafWeight(strength) / this.getLeafWeight(200);
      case 2: return amount * 0.14; // Агар
      case 3: return amount * 0.14; // Пектин
      default: return amount;
    }
  }

  convertFromBase(type: number, amount: number, strength: number): number {
    switch (type) {
      case 1: return amount * this.getLeafWeight(200) / this.getLeafWeight(strength);
      case 2: return amount / 0.14;
      case 3: return amount / 0.14;
      default: return amount;
    }
  }

  getLeafWeight(strength: number): number {
    switch (strength) {
      case 100: return 5; // Titanium
      case 125: return 3.3; // Bronze
      case 160: return 2.5; // Silver
      case 200: return 2; // Gold
      case 250: return 1.7; // Platinum
      default: return 2; // По умолчанию Gold
    }
  }

  round(value: number): number {
    return Math.round(value * 10) / 10; // Округление до десятых
  }
}
