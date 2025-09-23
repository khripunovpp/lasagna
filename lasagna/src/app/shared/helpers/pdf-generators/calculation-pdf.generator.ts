import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {RubikFont} from '../../../../assets/fonts/Rubik-Regular-normal';
import {Calculation, CalculationTableParams} from '../../../features/recipes/service/providers/calulate-recipe.service';
import {TranslateService} from '@ngx-translate/core';
import {getUnitMarker} from '../unit.helper';
import {productLabelFactory} from '../../factories/entity-labels/product.label.factory';

const fixed  = (num?: number, precision?: number) => {
  return Number.parseFloat(num?.toString() || '0').toFixed(precision ?? 2);
}

export function calculationPdfGenerator(
  calculation: Calculation,
  settings: {
    rowsPrecision?: number
    totalPrecision?: number
    currency?: string
  } = {},
  deps?: {
    translate?: TranslateService,
  }
) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  doc.addFileToVFS('Rubik-Regular-normal.ttf', RubikFont);
  doc.addFont('Rubik-Regular-normal.ttf', 'Rubik-Regular', 'normal', 'Identity-H');
  doc.setFont('Rubik-Regular');

  const leftX = 10;
  const lineSpacing = 6;
  let currentY = 10;

  const recipeCost = calculation.calculation;

  const t = (key: string, params?: any) => deps?.translate?.instant(key, params) || key;

  // Заголовок
  doc.setFontSize(14);
  doc.text(recipeCost.recipeName, leftX, currentY);
  currentY += lineSpacing * 2;

  doc.setFontSize(10);
  doc.text(`${t('recipe.calculation.outcome.label')}: ${fixed(recipeCost.outcomeAmount)} ${t(getUnitMarker(recipeCost.outcomeUnit))}`, leftX, currentY);
  currentY += lineSpacing;

  doc.setFontSize(10);
  doc.text(`${t('recipe.calculation.one-unit.label')} ${t(getUnitMarker(recipeCost.outcomeUnit))}: ${fixed(recipeCost.pricePerOutcomeUnit)} ${settings.currency}`, leftX, currentY);
  currentY += lineSpacing;

  const nameFactory = (row: CalculationTableParams) => {
    let name = '';
    if (row.type === 'recipe-row'){
      name = row.name;
    } else if (row.type === 'total') {
      name = t(row.name);
    } else {
      name = productLabelFactory(row.ingredient?.product_id!, t);
    }
    return name;
  }

  // Таблица ингредиентов внизу
  const tableBody = calculation.table.map((row: CalculationTableParams, idx) => [
    idx + 1,
    nameFactory(row),
    fixed(row.amount,settings.rowsPrecision) + ' ' + t(getUnitMarker(row.unit)),
    (row.price_per_unit?.toFixed(settings.rowsPrecision ?? 2) || '-') + ' ' + t(getUnitMarker(row.unit)) +  ` / ${t(getUnitMarker(settings.currency || 'USD'))}`,
    (row.total?.toFixed(settings.rowsPrecision ?? 2) || '-' ) + ' ' + settings.currency,
  ]);


  autoTable(doc, {
    startY: currentY + 5,
    head: [['#', t('recipe.calculation.table.name.title'), t('recipe.calculation.table.amount.title'), t('recipe.calculation.table.price.title'), t('recipe.calculation.table.total.title')]],
    body: tableBody,
    styles: {font: 'Rubik-Regular', fontSize: 10, fontStyle: 'normal'},
    headStyles: {font: 'Rubik-Regular', fillColor: [33, 33, 33], fontStyle: 'normal'},
  });

  // Дата и время генерацияя в языке пользователя
  const generationDate = new Date().toLocaleDateString(deps?.translate?.currentLang || 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  doc.setFontSize(8);
  doc.text(`${t('recipe.calculation.generation-date.label')}: ${generationDate}`, leftX, doc.internal.pageSize.getHeight() - 10);


  doc.save(`${recipeCost.recipeName || 'recipe'}.pdf`);
}
