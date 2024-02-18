import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from 'src/app/core/services/post/post.services';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(private service: DataService) { }

  data: any;
  limit: number = 5;

  ngOnInit(): void {
    this.getPosts(this.limit)
  }

  getPosts(limit: number) {
    this.service.getPosts(limit).subscribe({
      next: value => {
        this.data = value;
      },
      error: err => {
        console.error('error get posts', err)
      }
    })
  }


}
