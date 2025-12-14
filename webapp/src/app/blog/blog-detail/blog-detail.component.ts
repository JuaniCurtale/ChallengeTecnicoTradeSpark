import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogService, BlogPost } from '../blog.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  post: Partial<BlogPost> = { title: '', content: '' };

  constructor(
    private router: Router,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    // This component only handles new post creation
  }

  savePost(): void {
    this.blogService.createPost(this.post).subscribe({
      next: (newPost) => {
        alert('Post created successfully');
        this.router.navigate(['/posts']);
      },
      error: (error) => {
        console.error('Error creating post:', error);
        alert('Error creating post. Please try again.');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/posts']);
  }
}

