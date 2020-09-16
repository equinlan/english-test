import { Injectable } from '@angular/core';
import { TestNode } from './test-node';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestNodesService {
  test$: Observable<any>;

  constructor(private http: HttpClient) {
    this.test$ = this.http.get('assets/node_data.json');
  }

  find(nodeId: string): Observable<TestNode> {
    return this.test$
      .pipe(
        map((nodesJSON: string) => {
          let data = <TestNode>nodesJSON[nodeId];
          return data;
        }),
        map(node => <TestNode>{
          id: nodeId,
          ...node
        }),
        take(1)
      );
  }
}
