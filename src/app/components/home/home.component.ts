import { Component, OnInit, OnDestroy } from '@angular/core';
import IPost from 'src/app/shared/interfaces/post';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  place!: IPost;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    // this.api.getAllPosts().subscribe((places) => {});
  }
  ngOnDestroy(): void {}
}
