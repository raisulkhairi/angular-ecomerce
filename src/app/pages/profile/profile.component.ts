import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(private userService: UserService) { }

  user: any;

  @Input() set id(userId: number) {
    this.getUser(userId);
  }

  getUser(id: number) {
    this.userService.getUser(id).subscribe({
      next: val => {
        this.user = val;
      },
      error: err => {
        console.error('something wrong !', err)
      }
    })
  }

}
