from rest_framework import viewsets
from django_filters import rest_framework as filters
from django.db.models import Q
from .models import BlogPost, Comment,Category
from .serializers import BlogPostSerializer, CommentSerializer, CategorySerializer


#Clase destinada a definir reglas de filtrado
class BlogPostFilter(filters.FilterSet): 
    #Filtro por id categoria
    category = filters.NumberFilter(field_name='categories__id')

    #Filtro por rango de fechas
    created_at_after = filters.DateTimeFilter(field_name='created_at', lookup_expr='gte')
    created_at_before = filters.DateTimeFilter(field_name='created_at', lookup_expr='lte')

    search = filters.CharFilter(method='filter_by_search')
    class Meta:
        model = BlogPost
        fields = ['category','created_at_after','created_at_before','search']

    def filter_by_search(self, queryset, name, value):
        return queryset.filter(
            Q(title__icontains=value) | Q(content__icontains=value)
        )
#Vista para manejar Comentarios (Crear, listar, etc.)
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    filterset_fields = ['post']

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all().order_by('-created_at')
    serializer_class = BlogPostSerializer
    filterset_class = BlogPostFilter
