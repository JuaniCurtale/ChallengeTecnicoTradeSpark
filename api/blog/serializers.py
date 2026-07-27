from rest_framework import serializers
from .models import BlogPost, Comment, Category


class BlogPostSerializer(serializers.ModelSerializer):
    #Para lectura
    categories_detail = CategorySerializer(source='categories', many=True, read_only=True)
    
    #Para escritura: permite asociar categorías enviando una lista de IDs
    categories = serializers.PrimaryKeyRelatedField(
            queryset=Category.objects.all(),
            many=True,
            required=False
        )

    # Incluye los comentarios asociados al post (solo lectura)
    comments = CommentSerializer(source='comment_set', many=True, read_only=True)


    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'content', 'created_at', 'updated_at','categories','categories_detail','comments']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'content', 'created_at', 'post']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

