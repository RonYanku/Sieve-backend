import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { List } from "./list.model";
import { Task } from "./task.model";

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: List[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  getLists(id: string) {
    return this.http.get<{
      id: string;
      title: string;
      creator: string;
    }>("http://localhost:3000/lists/");
  }
}
