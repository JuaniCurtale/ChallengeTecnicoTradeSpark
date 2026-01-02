# Challenge Técnico - Full Stack Trainee

## Descripción

Este proyecto es un challenge técnico para evaluar habilidades full-stack. El proyecto base incluye una aplicación de blog con operaciones CRUD básicas y filtrado client-side ya implementado.

## Requisitos Previos

- Docker
- Docker Compose
- Cuenta en GitHub o GitLab (para tu repositorio público)

## Configuración

1. **Clonar este repositorio** (OBLIGATORIO):
   ```bash
   git clone https://gitlab.com/BrunoGuidi/challenge-plataforma-tradespark.git
   cd challenge-plataforma-tradespark
   ```
   - **Importante**: Usa `git clone` (NO descargues como ZIP ni uses `git clone --depth 1`)
   - Esto preserva todo el historial de commits necesario para la evaluación

2. Ejecutar el siguiente comando en la raíz del proyecto:

```bash
docker compose up -d
```

Esto iniciará:
- API Django REST Framework en `http://localhost:8000`
- Aplicación Angular en `http://localhost:4200`

El proyecto estará funcionando completamente después de este paso.

### Comandos Docker Útiles

- **Iniciar contenedores (en segundo plano)**: `docker compose up -d`
- **Detener contenedores**: `docker compose stop`
- **Iniciar contenedores**: `docker compose start`
- **Reiniciar contenedores**: `docker compose restart`
- **Detener y eliminar contenedores**: `docker compose down`
- **Ver logs**: `docker compose logs -f`

**Nota importante**: Si realizas cambios en los modelos de Django, necesitas reiniciar el contenedor de la API:
```bash
docker compose restart api
```

## Estructura del Proyecto

- `api/`: Backend Django REST Framework
- `webapp/`: Frontend Angular

## Estado Actual del Proyecto

El proyecto base incluye:

- **CRUD completo** de posts
- **Filtrado client-side**: búsqueda por título y contenido
- **Base de datos pre-configurada**: SQLite con aproximadamente 50 posts y 10 categorías para facilitar el desarrollo y testing
- **Archivos SQL disponibles**: 
  - `posts_inserts.sql`: Script SQL para insertar posts adicionales si necesitas más datos de prueba
  - `categories_inserts.sql`: Script SQL para insertar las 10 categorías predefinidas
- **Modelos secundarios**: 
  - `Comment`: modelo básico con estructura (`id`, `content`, `created_at`)
  - `Category`: modelo básico con estructura (`id`, `name`)

## Requisitos a Implementar

Debes implementar **tres requerimientos obligatorios**:

### 1. Sistema de Comentarios

Implementa un sistema de comentarios donde cada post puede tener múltiples comentarios asociados. Los usuarios deben poder crear comentarios para cada post y visualizarlos en la vista de detalle.

**Consideraciones técnicas:**
- Establece la relación apropiada entre Comment y BlogPost
- Debe soportar operaciones CRUD básicas para comentarios

**Modelo proporcionado**: `Comment` con estructura básica (campos `content` y `created_at`)

### 2. Sistema de Categorías

Implementa un sistema de categorías donde cada post puede pertenecer a múltiples categorías. Las categorías deben poder ser seleccionadas al crear o editar un post, y deben ser visualizadas tanto en la lista de posts como en la vista de detalle.

**Consideraciones técnicas:**
- Establece la relación apropiada entre BlogPost y Category
- El frontend debe permitir selección múltiple de categorías
- Las categorías deben tener una representación visual clara (tags, badges, etc.)

**Modelo proporcionado**: `Category` con estructura básica (campo `name`)

### 3. Transformar Filtrado a server-side

Actualmente, el filtrado se realiza client-side: todos los posts se obtienen y se filtran en el frontend. Transforma esta funcionalidad para que el filtrado se realice server-side, manteniendo la funcionalidad de la interfaz existente.

**Consideraciones técnicas:**
- El backend debe soportar parámetros de query para filtrado
- El frontend debe actualizar su lógica para trabajar con datos filtrados del servidor

## Entregables

1. Código completo implementando los tres requerimientos
2. El proyecto debe funcionar correctamente con `docker compose up -d`
3. Documentación breve de las decisiones de diseño (opcional pero valorado)

## Proceso de Entrega

1. **Desarrollo**: Implementa los requerimientos en tu repositorio local
2. **Crear repositorio remoto**: Crea un repositorio vacío en GitHub o GitLab
3. **Push a tu repositorio remoto**:
   ```bash
   git remote add origin <URL-de-tu-repositorio>
   git push -u origin --all
   ```
   - Esto subirá todo el historial de commits (incluyendo los originales) a tu repositorio
4. **Repositorio público**: Asegúrate de que tu repositorio sea público
5. **Notificación**: Envía un email cuando el challenge esté completado con el siguiente formato:
   - **Para**: tech@tradespark.la
   - **Asunto**: `<Tu nombre> - Challenge técnico plataforma`
   - **Cuerpo**: `<URL del repositorio>`
