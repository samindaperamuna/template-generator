import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateParserService {
  private templateRegEx = new RegExp('\{\{[0-9a-zA-Z]+\}\}', 'g');
  private queue = [];
  private subject = new Subject<string[]>();

  public subscribe(...observer: any): Subscription {
    return this.subject.subscribe(...observer);
  }

  /**
   * Look for the pattern in the given text and if there are any,
   * add them to the queue if not already included.
   *
   * @param text String to look for the template pattern.
   */
  addTemplateKeys(text: string): void {
    var templateStrings = this.returnUniqueKeys(text);

    // If the result is not null and there is a change since the last time,
    // then proceed with notifying subscribers.
    if (templateStrings !== null && !this.arraysMatch(this.queue, templateStrings)) {
      // First reset the queue.
      // this.queue.length = 0;

      this.queue = templateStrings;

      try {
        this.subject.next(this.queue);
      } catch (error) {
        this.subject.error(error);
      }
    }
  }

  /**
   * Check if two string arrays are the same length and contains the same items in the same order.
   *
   * @param array1 First array.
   * @param array2 Second array.
   * @returns Whether the arrays match or not.
   */
  private arraysMatch(array1: string[], array2: string[]): boolean {
    if (array1.length !== array2.length) {
      return false;
    }

    for (let i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) { return false; }
    }

    return true;
  }

  /**
   * Get the unique keys in the given string.
   *
   * @param text String to analyze.
   */
  private returnUniqueKeys(text: string): string[] {
    var keys = text.match(this.templateRegEx);
    var result = [];

    if (keys !== null) {
      keys.forEach(key => {
        if (!result.includes(key)) {
          result.push(key);
        }
      });
    }

    return result
  }
}
