import {Injectable, signal, computed} from '@angular/core';
import {PaginationConfig} from '../../view/ui/pagination/pagination.component';

@Injectable({
  providedIn: 'root'
})
export class PaginationService<T> {
  private readonly _items = signal<T[]>([]);
  private readonly _currentPage = signal(1);
  private readonly _itemsPerPage = signal(20);

  // Computed values
  readonly totalItems = computed(() => this._items().length);
  readonly totalPages = computed(() => Math.ceil(this.totalItems() / this._itemsPerPage()));
  readonly currentPage = computed(() => this._currentPage());
  readonly itemsPerPage = computed(() => this._itemsPerPage());

  readonly paginatedItems = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage();
    const endIndex = startIndex + this.itemsPerPage();
    return this._items().slice(startIndex, endIndex);
  });

  readonly config = computed((): PaginationConfig => ({
    itemsPerPage: this.itemsPerPage(),
    currentPage: this.currentPage(),
    totalItems: this.totalItems()
  }));

  /**
   * Устанавливает массив элементов для пагинации
   */
  setItems(items: T[]) {
    this._items.set(items);
    this.resetToFirstPage();
  }

  /**
   * Устанавливает количество элементов на странице
   */
  setItemsPerPage(itemsPerPage: number) {
    this._itemsPerPage.set(itemsPerPage);
    this.resetToFirstPage();
  }

  /**
   * Переходит на указанную страницу
   */
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this._currentPage.set(page);
    }
  }

  /**
   * Переходит на следующую страницу
   */
  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this._currentPage.set(this.currentPage() + 1);
    }
  }

  /**
   * Переходит на предыдущую страницу
   */
  previousPage() {
    if (this.currentPage() > 1) {
      this._currentPage.set(this.currentPage() - 1);
    }
  }

  /**
   * Переходит на первую страницу
   */
  firstPage() {
    this._currentPage.set(1);
  }

  /**
   * Переходит на последнюю страницу
   */
  lastPage() {
    this._currentPage.set(this.totalPages());
  }

  /**
   * Сбрасывает на первую страницу
   */
  resetToFirstPage() {
    this._currentPage.set(1);
  }

  /**
   * Проверяет, есть ли следующая страница
   */
  hasNextPage(): boolean {
    return this.currentPage() < this.totalPages();
  }

  /**
   * Проверяет, есть ли предыдущая страница
   */
  hasPreviousPage(): boolean {
    return this.currentPage() > 1;
  }

  /**
   * Получает информацию о текущем диапазоне элементов
   */
  getRangeInfo() {
    const start = (this.currentPage() - 1) * this.itemsPerPage() + 1;
    const end = Math.min(this.currentPage() * this.itemsPerPage(), this.totalItems());
    
    return {
      start,
      end,
      total: this.totalItems(),
      currentPage: this.currentPage(),
      totalPages: this.totalPages()
    };
  }
} 