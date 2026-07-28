import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogService, BlogPost, Comment, Category } from '../blog.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  post: Partial<BlogPost> = { title: '', content: '', comments: [],categories: []};
  postId: number | null = null;
  newCommentContent: string = '';

  availableCategories: Category[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {

    this.loadCategories();
    // Obtenemos el ID de los parámetros de la ruta (ej. /posts/1)
    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam) {
      this.postId = Number(idParam);
      this.loadPost(this.postId);
    }  
  }

  loadCategories(): void {
    this.blogService.getCategories().subscribe({
      next: (cats) => {
        this.availableCategories = cats;
      },
      error: (error) => console.error('Error al cargar categorías:', error)
    });
  }

  // Carga el post y sus comentarios desde el backend
  loadPost(id: number): void {
    this.blogService.getPost(id).subscribe({
      next: (data) => {
        this.post = data;
        
        // Si el post ya tiene categories_detail (GET), extraemos sus IDs para preparar el array `categories` (POST/PUT)
        if (data.categories_detail && data.categories_detail.length > 0) {
          this.post.categories = data.categories_detail.map(c => c.id);
        } else {
          this.post.categories = [];
        }
      },
      error: (error) => {
        console.error('Error al cargar el post:', error);
      }
    });
  }

  onCategoryToggle(categoryId: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    
    if (!this.post.categories) {
      this.post.categories = [];
    }

    if (isChecked) {
      // Agregar ID si no está
      if (!this.post.categories.includes(categoryId)) {
        this.post.categories.push(categoryId);
      }
    } else {
      // Remover ID si desmarca
      this.post.categories = this.post.categories.filter(id => id !== categoryId);
    }
  }

  isCategorySelected(categoryId: number): boolean {
      return this.post.categories?.includes(categoryId) ?? false;
    }
  // Guarda un nuevo comentario para el post actual
  addComment(): void {
    if (!this.newCommentContent.trim() || !this.postId) return;

    const newComment = {
      post: this.postId,
      content: this.newCommentContent
    };

    this.blogService.createComment(newComment).subscribe({
      next: (createdComment: Comment) => {
        // Inicializamos el array si no existe y agregamos el comentario
        if (!this.post.comments) {
          this.post.comments = [];
        }
        this.post.comments.push(createdComment);

        // Limpiamos el campo de texto
        this.newCommentContent = '';
      },
      error: (error) => {
        console.error('Error al crear comentario:', error);
        alert('Error al publicar el comentario.');
      }
    });
  }

  savePost(): void {
    const request$ = this.postId 
      ? this.blogService.updatePost(this.postId, this.post)
      : this.blogService.createPost(this.post);

    request$.subscribe({
      next: (savedPost) => {
        alert(this.postId ? 'Post actualizado con éxito' : 'Post creado con éxito');
        this.router.navigate(['/posts', savedPost.id || this.postId]);
      },
      error: (error) => {
        console.error('Error al guardar el post:', error);
        alert('Error al guardar el post. Intentá de nuevo.');
      }
    });
  }

  deleteComment(commentId: number): void {
  if (confirm('¿Seguro que querés borrar este comentario?')) {
    this.blogService.deleteComment(commentId).subscribe(() => {
      this.post.comments = this.post.comments?.filter(c => c.id !== commentId);
    });
  }
  }

  cancel(): void {
    this.router.navigate(['/posts']);
  }
}

