from rest_framework import serializers
from .models import BlogPost, Comment, Category


class BlogPostSerializer(serializers.ModelSerializer):
    categories_detail = CategorySerializer(source='categories', many=True, read_only=True)
    
    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'content', 'created_at', 'updated_at']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'content', 'created_at', 'post']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

