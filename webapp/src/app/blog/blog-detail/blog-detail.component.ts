import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogService, BlogPost, Comment } from '../blog.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  post: Partial<BlogPost> = { title: '', content: '', comments: []};
  postId: number | null = null;
  newCommentContent: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    // Obtenemos el ID de los parámetros de la ruta (ej. /posts/1)
    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam) {
      this.postId = Number(idParam);
      this.loadPost(this.postId);
    }  
  }

  // Carga el post y sus comentarios desde el backend
  loadPost(id: number): void {
    this.blogService.getPost(id).subscribe({
      next: (data) => {
        this.post = data;
      },
      error: (error) => {
        console.error('Error al cargar el post:', error);
      }
    });
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
    this.blogService.createPost(this.post).subscribe({
      next: (newPost) => {
        alert('Post created successfully');
        this.router.navigate(['/posts',newPost.id]);
      },
      error: (error) => {
        console.error('Error creating post:', error);
        alert('Error creating post. Please try again.');
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

