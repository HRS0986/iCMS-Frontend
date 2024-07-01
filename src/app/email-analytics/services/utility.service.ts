/**
 * UtilityService provides common functions used in data services
 */
import { Injectable } from '@angular/core';
import { Filter } from '../interfaces/filters';
import { CommonColors } from '../interfaces/utility';
import { Issue } from '../interfaces/issues';
import { Inquiry } from '../interfaces/inquiries';
import { Suggestion } from '../interfaces/suggestions';

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


  /**
   * Shortens a string to a specified maximum length.
   * If the input string is shorter than or equal to the maximum length, it returns the original string.
   * If the input string is longer than the maximum length, it truncates the string and adds ellipsis at the end.
   * If the truncation occurs in the middle of a word, it extends the endIndex to include the current word.
   * @param input The input string to be shortened.
   * @param maxLength The maximum length of the shortened string. Default is 50.
   * @returns An object containing the shortened text and a boolean indicating if the text was shortened.
   * @example
   *   const shortenedText = this.utility.shortenString("This is a long string", 10);
   *   console.log(shortenedText.text);  // Output: "This is a..."
   */
  shortenString(input: string, maxLength: number=50): { text: string, isShortened: boolean } {
    if (!input) { // Check for null, undefined, or empty string
      return {
        text: 'N/A',
        isShortened: false
      }
    }
    if (input.length <= maxLength) {
        return {
            text: input,
            isShortened: false
        }
    }
    let endIndex = maxLength;
    // Extend endIndex to include the current word if it does not end exactly at a space
    while (endIndex < input.length && input[endIndex] !== ' ') {
        endIndex++;
    }
    return {
      text: input.slice(0, endIndex) + '...',
      isShortened: true
    }
  }

  /**
   * Converts minutes to a string representation of days, hours, and minutes.
   * @param mins - The number of minutes to convert.
   * @returns A string representation of the converted time in the format "X days X hours X minutes".
   */
  convertMinutes(mins: number | undefined): string {
    if (mins === undefined) {
      return '';
    }
    let temp = mins;
    const days = Math.floor(mins / 1440);
    temp = temp % 1440;
    const hours = Math.floor(temp / 60);
    const minutes = Math.floor(temp % 60);  // floor used to avoid decimals (e.g. seconds)

    const daysString = days !== 1 ? 'days' : 'day';
    const hoursString = hours !== 1 ? 'hours' : 'hour';
    const minutesString = minutes !== 1 ? 'minutes' : 'minute';

    if (days > 0) {
      return `${days} ${daysString} ${hours} ${hoursString}`;
    } else if (hours > 0) {
      return `${hours} ${hoursString} ${minutes} ${minutesString}`;
    } 
    return `${minutes} ${minutesString}`;
  }


  /**
   * Retrieves the common colors used in the application.
   * @returns An object containing the common colors.
   */
  getColors(): CommonColors {
    const docStyle: CSSStyleDeclaration = getComputedStyle(document.documentElement);
    const colors = {
      positive: docStyle.getPropertyValue('--positive-color'),
      negative: docStyle.getPropertyValue('--negative-color'),
      neutral: docStyle.getPropertyValue('--neutral-color'),
    };
    return colors;
  }
}
