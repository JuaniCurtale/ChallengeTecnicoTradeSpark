import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//Definimos la interfaz del comentario
export interface Comment {
  id?: number;
  post: number;
  content: string;
  created_at?: string;
}

// Agregamos comentarios al Blog
export interface BlogPost {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  comments?: Comment[]; 

  // Para LECTURA: Muestra el array de objetos
  categories_detail?: Category[];
  
  // Para ESCRITURA: Enviamos los IDs de las categorías seleccionadas
  categories?: number[];
}

export interface Category{
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}
  
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories/`);
  }

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

  createComment(comment: { post: number; content: string }): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/comments/`, comment);
  }
  deleteComment(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/comments/${id}/`);
  }

  updateComment(id: number, content: string): Observable<Comment> {
  return this.http.patch<Comment>(`${this.apiUrl}/comments/${id}/`, { content });
  }
}

