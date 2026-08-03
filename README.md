# 🚀 Challenge técnico - Full Stack Trainee (TradeSpark)

Este repositorio contiene la resolución del challenge técnico para el puesto de Full Stack Trainee. La aplicación consiste en una plataforma de blog interactiva desarrollada con **Django REST Framework** en el backend y **Angular** en el frontend, todo orquestado mediante **Docker**.

---

## 🛠️ Tecnologías Utilizadas

- **Backend:** Python / Django REST Framework
- **Frontend:** TypeScript / Angular / HTML & CSS
- **Base de Datos:** SQLite (preconfigurada)
- **Contenedores:** Docker & Docker Compose

---

## 📌 Requerimientos Implementados

### 1. 💬 Sistema de Comentarios
- Relación asignada entre `Comment` y `BlogPost`.
- Operaciones CRUD para los comentarios.
- Visualización de comentarios en la vista de detalle de cada publicación.

### 2. 🏷️ Sistema de Categorías
- Relación N:M entre `BlogPost` y `Category`.
- Selección múltiple de categorías al crear o editar posts.
- Representación visual mediante tag tanto en el listado como en la vista detallada.

### 3. 🔍 Filtrado Server-Side
- Migración del filtrado que anteriormente se realizaba client-side hacia el backend.
- Endpoints del backend optimizados para recibir parámetros de búsqueda (`query params`).
- Actualización de los servicios de Angular para realizar peticiones filtradas al servidor.

---

## 🧠 Decisiones de Diseño y Arquitectura

* **Separación de Responsabilidades:** Se delegó la lógica de filtrado y procesamiento de datos al backend para optimizar el rendimiento de la aplicación, reducir el uso de memoria en el navegador y preparar la app para escalar con volúmenes mayores de información.
* **Modelado de Datos (Relaciones):**
  * **Comentarios:** Se implementó una relación **1:N** (`ForeignKey`) entre `BlogPost` y `Comment`, permitiendo la carga y visualización reactiva de comentarios específicos para cada publicación.
  * **Categorías:** Se utilizó una relación **N:M** (`ManyToManyField`) permitiendo asignaciones flexibles mediante *badges/tags* en la interfaz de usuario.

## ⚙️ Instalación y Configuración

### Requisitos Previos
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Pasos para Ejecutar

1. **Clonar este repositorio y ubicarse en la raiz del proyecto:**
   ```bash
   git clone https://github.com/JuaniCurtale/ChallengeTecnicoTradeSpark.git
   cd ChallengeTecnicoTradeSpark
2. **Iniciar los servicios con Docker Compose**
   ```bash
   docker compose up -d
3. **Acceder a las aplicaciones**
   Frontend http://localhost:4200

   Backend API http://localhost:8000
