import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { PostsService } from "./posts.service";
import { AuthService } from "../auth/auth.service";
import { List } from "./list.model";
import { Task } from "./task.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  isLoading = false;
  userIsAuthenticated = false;
  userId: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;

  lists: List[];
  tasks: Task[];
  selectedListId: string;

  constructor(
    public postsService: PostsService,
    private authService: AuthService
  ) {}


  ngOnInit() {
    //added get lists, missing get specific list data in OnInit
    //for when selectedList != null, which I would know from router.params
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.isLoading = false;
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
    this.postsService.getLists(this.userId);
  }

  ngOnDestroy(): void {

  }
}
