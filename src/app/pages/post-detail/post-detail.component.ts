import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from 'src/app/core/services/post/post.services';
import { RouterModule } from '@angular/router';
import { CommentService } from 'src/app/core/services/comments/comment.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent {
  constructor(
    private postService: DataService,
    private commentService: CommentService,
    private userService: UserService
  ) { }

  data: any;
  comment: any;
  user: any;

  @Input() set id(postId: number) {
    this.getPost(postId);
    this.getComment(postId);
  }

  getPost(id: number) {
    this.postService.getPost(id).subscribe({
      next: value => {
        this.data = value
      },
      error: err => {
        console.error(err)
      }
    })
  }

  getComment(postId: number) {
    this.commentService.getComment(postId).subscribe({
      next: value => {
        this.comment = value;
        this.getUserService(value.userId)
      },
      error: err => {
        console.error('error get comment ', err)
      }
    })
  }


  getUserService(userId: number) {
    this.userService.getUser(userId).subscribe({
      next: val => {
        this.user = val
      },
      error: err => {
        console.error('err get user', err)
      }
    })
  }
}
