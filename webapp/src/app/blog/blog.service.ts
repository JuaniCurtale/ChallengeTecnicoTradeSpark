import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.apiUrl}/posts/`);
  }

  getPost(id: number): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.apiUrl}/posts/${id}/`);
  }

  createPost(post: Partial<BlogPost>): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${this.apiUrl}/posts/`, post);
  }

  updatePost(id: number, post: Partial<BlogPost>): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${this.apiUrl}/posts/${id}/`, post);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/posts/${id}/`);
  }
}

