import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import IUser from 'src/app/shared/interfaces/user.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  constructor(public api: ApiService, private route: ActivatedRoute) {}
  user!: IUser;
  e: any;
  id!: any;
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.e = this.api.getAllUserData().subscribe((u) => {
      const result = u.filter((user) => user.uid === this.id);
      this.user = result[0];
    });

    this.user = this.e;
  }
  ngOnDestroy(): void {
    this.e.unsubscribe();
  }
}
