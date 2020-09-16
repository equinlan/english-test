import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WieItem } from './wie-item';
import { map, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WieItemsService {

  constructor(private http: HttpClient) { }

  find(wieItemIds: string[]): Observable<WieItem[]> {
    return this.http.get('assets/item_data.json')
    .pipe(
      map((itemsJSON: string) => {
        let items = itemsJSON;
        let output: WieItem[] = [];
        for (let i = 0; i < wieItemIds.length; i++) {
          output.push(<WieItem>{
            id: wieItemIds[i],
            ...items[wieItemIds[i]]
          })
        }
        return output;
      }),
      take(1)
    );
  }
}
