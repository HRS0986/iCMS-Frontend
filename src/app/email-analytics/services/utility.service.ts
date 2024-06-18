/**
 * UtilityService provides common functions used in data services
 */
import { Injectable } from '@angular/core';
import { Filter } from '../interfaces/filters';

@Injectable({
  providedIn: 'root'
})

export class UtilityService {

  constructor() { }

  /**
   * Builds the filter parameters based on the provided filter criteria, limit, skip, and exclude options.
   * @param filterCriteria - The filter criteria object.
   * @param limit - The maximum number of results to return.
   * @param skip - The number of results to skip.
   * @param exclude - An array of properties to exclude from the filter parameters.
   * @returns The built filter parameters as a string.
   * @example
   *    const params = this.utility.buildFilterParams(filterCriteria, limit, skip);
   *    return this.http.get<any>(`http://127.0.0.1:8000/?${params}`);
   */
  buildFilterParams(filterCriteria: Filter, limit: number, skip: number, exclude: Array<string> = []): any {
    let params = "limit=" + limit + "&skip=" + skip;

    if (filterCriteria.searchText && !exclude.includes("searchText")) {
      params += "&q=" + filterCriteria.searchText;
    }
    if (filterCriteria.selectedSenders.length > 0 && !exclude.includes("selectedSenders")) {
      params += "&s=" + filterCriteria.selectedSenders.join(",");
    }
    if (filterCriteria.selectedReceivers.length > 0 && !exclude.includes("selectedReceivers")) {
      params += "&r=" + filterCriteria.selectedReceivers.join(",");
    }
    if (filterCriteria.selectedTags.length > 0 && !exclude.includes("selectedTags")) {
      params += "&tags=" + filterCriteria.selectedTags.join(",");
    }
    if (filterCriteria.selectedStatus.length > 0 && !exclude.includes("selectedStatus")) {
      params += "&status=" + filterCriteria.selectedStatus.join(",");
    }
    if (filterCriteria.selectedDate.length === 2 && !exclude.includes("selectedDate")) {
      let from: string, to: string;
      from = filterCriteria.selectedDate[0].toISOString().split("T")[0];  // To remove time values
      to = filterCriteria.selectedDate[1].toISOString().split("T")[0];
      params += "&dateFrom=" + from + "&dateTo=" + to;
    }
    if (filterCriteria.importantOnly !== false && !exclude.includes("importantOnly")) {
      params += "&imp=" + filterCriteria.importantOnly.toString();  
    }
    if (filterCriteria.newOnly !== false && !exclude.includes("newOnly")) {
      params += "&new=" + filterCriteria.newOnly.toString();
    }
    if (filterCriteria.reqAllTags !== false && !exclude.includes("reqAllTags")) {
      params += "&allTags=" + filterCriteria.reqAllTags.toString();
    }
    return params;
  }
}
