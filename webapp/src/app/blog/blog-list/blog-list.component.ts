import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogService, BlogPost, Category } from '../blog.service';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  posts: BlogPost[] = [];
  filteredPosts: BlogPost[] = [];
  availableCategories: Category[] = [];
  searchTerm: string = '';
  editingPostId: number | null = null;
  editingPost: Partial<BlogPost> = {};
  expandedPostIds: Set<number> = new Set();

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadPosts();
  }

  loadCategories(): void {
    this.blogService.getCategories().subscribe({
      next: (cats) => { this.availableCategories = cats; },
      error: (err) => console.error('Error loading categories:', err)
    });
  }

  loadPosts(): void {
    this.blogService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.filterPosts();
      },
      error: (error) => {
        console.error('Error loading posts:', error);
        alert('Error loading posts. Please try again.');
      }
    });
  }

  toggleExpand(id: number): void {
    if (this.expandedPostIds.has(id)) {
      this.expandedPostIds.delete(id);
    } else {
      this.expandedPostIds.add(id);
    }
  }

  isExpanded(id: number): boolean {
    return this.expandedPostIds.has(id);
  }

  startEdit(post: BlogPost): void {
    this.editingPostId = post.id;
    this.editingPost = { ...post };

    // Mapeamos las categorías actuales a sus IDs para poder editarlas con los checkboxes
    if (post.categories_detail && post.categories_detail.length > 0) {
      this.editingPost.categories = post.categories_detail.map(c => c.id);
    } else {
      this.editingPost.categories = [];
    }
  }

  isCategorySelected(categoryId: number): boolean {
    return this.editingPost.categories?.includes(categoryId) ?? false;
  }

  onCategoryToggle(categoryId: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (!this.editingPost.categories) this.editingPost.categories = [];

    if (isChecked) {
      if (!this.editingPost.categories.includes(categoryId)) {
        this.editingPost.categories.push(categoryId);
      }
    } else {
      this.editingPost.categories = this.editingPost.categories.filter(id => id !== categoryId);
    }
  }

  saveEdit(): void {
    if (this.editingPostId && this.editingPost.id) {
      this.blogService.updatePost(this.editingPostId, this.editingPost).subscribe({
        next: () => {
          alert('Post updated successfully');
          this.cancelEdit();
          this.loadPosts();
        },
        error: (error) => {
          console.error('Error updating post:', error);
          alert('Error updating post. Please try again.');
        }
      });
    }
  }

  cancelEdit(): void {
    this.editingPostId = null;
    this.editingPost = {};
  }

  collapseAll(): void {
    this.expandedPostIds.clear();
  }

  deletePost(id: number): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.blogService.deletePost(id).subscribe({
        next: () => {
          alert('Post deleted successfully');
          this.loadPosts();
        },
        error: (error) => {
          console.error('Error deleting post:', error);
          alert('Error deleting post. Please try again.');
        }
      });
    }
  }

  filterPosts(): void {
    this.cancelEdit();
    this.collapseAll();
    if (!this.searchTerm.trim()) {
      this.filteredPosts = [...this.posts];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredPosts = this.posts.filter(post => 
        post.title.toLowerCase().includes(term) || 
        post.content.toLowerCase().includes(term)
      );
    }
  }
}

