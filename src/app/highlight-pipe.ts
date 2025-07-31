import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true,
})
export class HighlightPipe implements PipeTransform {
  transform(text: string, search: string = ''): any {
    if (!search || !text) return text;
    // Ignore la casse et les accents (option bonus)
    const normalizedSearch = search.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const normalizedText = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    // Remplace toutes les occurrences par du HTML surligné
    return normalizedText.replace(regex, `<mark class="bg-yellow-200 rounded px-1">$1</mark>`);
  }
}
