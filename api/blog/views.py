from rest_framework import viewsets
from django_filters import rest_framework as filters
from .models import BlogPost
from .serializers import BlogPostSerializer


#Clase destinada a definir reglas de filtrado
class BlogPostFilter(filters.FilterSet): 
    #Filtro por id categoria
    category = filters.NumberFilter(field_name='categories__id')

    #Filtro por rango de fechas
    created_at_after = filters.DateTimeFilter(field_name='created_at', lookup_expr='gte')
    created_at_before = filters.DateTimeFilter(field_name='created_at', lookup_expr='lte')

    class Meta:
        model = BlogPost
        fields = ['category','created_at_after','created_at_before']
        
class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all().order_by('-created_at')
    serializer_class = BlogPostSerializer
    filterset_class = BlogPostFilter
