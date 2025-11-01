# 🎯 Issue Tracker - Sistema de Gestión de Incidencias



**Una aplicación full-stack moderna para la gestión inteligente de incidencias con clasificación automática mediante IA**

## 🚀 Características Principales

- **🔐 Autenticación JWT**: Sistema de login seguro con tokens
- **📊 Gestión de Proyectos**: Organiza tus incidencias por proyectos
- **🤖 Clasificación Inteligente**: Servicio de clasificación con python y fastApi
- **⚡ Interfaz Reactiva**: UI moderna y responsiva con Tailwind CSS
- **🐳 Containerización**: Despliegue fácil con Docker Compose
- **🔄 API RESTful**: Backend robusto con Express.js

## 🏗️ Arquitectura del Sistema

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Classifier    │
│   React + Vite  │◄──►│   Node.js       │◄──►│   Python        │
│   Port: 5173    │    │   Port: 4000    │    │   Port: 5000    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │   SQLite DB     │
                       │   data.db       │
                       └─────────────────┘
```

### 🧩 Componentes

| Servicio | Tecnología | Puerto | Descripción |
|----------|------------|--------|-------------|
| **Frontend** | React + Vite + Tailwind | 5173 | Interfaz de usuario moderna |
| **Backend** | Node.js + Express | 4000 | API REST y lógica de negocio |
| **Classifier** | Python + FastAPI | 5000 | Servicio de clasificación IA |
| **Database** | SQLite | - | Persistencia de datos |

## 🛠️ Instalación y Configuración

### Prerrequisitos

- **Docker** y **Docker Compose** instalados
- **Node.js** 18+ (para desarrollo local)
- **Python** 3.8+ (para desarrollo local)

### 🐳 Opción 1: Docker Compose (Recomendado)

```bash
# Clonar el repositorio
git clone https://github.com/KevinHernandezP/issue-tracker
cd issue-tracker

# Levantar todos los servicios
docker-compose up --build

# En modo detached (segundo plano)
docker-compose up -d --build
```

## 🎮 Uso de la Aplicación

### 1. **Acceso al Sistema**
- Navega a `http://localhost:5173`
- Usa las credenciales de prueba:
  - **Usuario**: `admin`
  - **Contraseña**: `1234`

### 2. **Gestión de Proyectos**
- Visualiza la lista de proyectos disponibles
- Selecciona un proyecto para ver sus incidencias

### 3. **Creación de Incidencias**
- Completa el formulario con título y descripción
- El sistema automáticamente clasificará la incidencia con tags:
  - 🔒 **security**: Para temas de autenticación, login, tokens
  - 🎨 **frontend**: Para UI, botones, pantallas
  - ⚙️ **backend**: Para base de datos, servidor, API
  - ⚡ **performance**: Para optimización y rendimiento
  - 📝 **general**: Para casos no específicos

### 4. **Visualización de Incidencias**
- Lista completa de incidencias del proyecto
- Tags automáticos generados por IA
- Estados y detalles de cada incidencia

## 🔧 API Endpoints

### Autenticación
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "1234"
}
```

### Proyectos
```http
GET /api/v1/projects
Authorization: Bearer <token>
```

### Incidencias
```http
# Obtener incidencias de un proyecto
GET /api/v1/issues/:projectId
Authorization: Bearer <token>

# Crear nueva incidencia
POST /api/v1/issues/:projectId
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Error en login",
  "description": "El sistema no permite autenticarse con credenciales válidas"
}
```

### Clasificador (Servicio Python)
```http
POST /classify
Content-Type: application/json

{
  "title": "Error en autenticación",
  "description": "Problema con el token JWT"
}

# Respuesta
{
  "tags": ["security"]
}
```

## 🧪 Testing y Desarrollo

### Verificar Estado de Servicios
```bash
# Backend
curl http://localhost:4000/health

# Classifier
curl http://localhost:5000/docs
```

### Logs de Contenedores
```bash
# Ver logs de todos los servicios
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f classifier
```

### Reiniciar Servicios
```bash
# Reiniciar todos los servicios
docker-compose restart

# Reiniciar un servicio específico
docker-compose restart backend
```

## 📁 Estructura del Proyecto

```
issue-tracker/
├── 🐳 docker-compose.yml          # Orquestación de servicios
├── 📚 README.md                   # Este archivo
├── backend/                       # API Node.js
│   ├── 📦 package.json
│   ├── 🚀 index.js               # Punto de entrada
│   ├── 🔧 app.js                 # Configuración Express
│   └── src/
│       ├── controllers/          # Lógica de negocio
│       ├── routes/              # Definición de rutas
│       ├── middleware/          # Middlewares personalizados
│       ├── services/            # Servicios externos
│       └── db/                  # Configuración BD
├── frontend/                     # Aplicación React
│   ├── 📦 package.json
│   ├── 🎨 src/
│   │   ├── pages/              # Componentes de página
│   │   ├── components/         # Componentes reutilizables
│   │   └── 🎯 App.jsx          # Componente principal
│   └── 🎨 tailwind.config.js   # Configuración Tailwind
└── classifier/                   # Servicio Python
    ├── 📋 requirements.txt
    ├── 🤖 app.py               # API FastAPI
    └── 🐳 Dockerfile
```

## 🔒 Variables de Entorno

### Backend
```env
PORT=4000
PYTHON_URL=http://classifier:5000
JWT_SECRET=secretkey
```

### Frontend
```env
VITE_API_URL=http://localhost:4000
```

## 🚀 Despliegue en Producción

### Consideraciones
- Cambiar `JWT_SECRET` por un valor seguro
- Configurar CORS apropiadamente
- Usar base de datos PostgreSQL en lugar de SQLite
- Implementar HTTPS
- Configurar logs centralizados
- Añadir monitoreo y métricas

### Docker Production
```bash
# Build para producción
docker-compose -f docker-compose.prod.yml up --build -d
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte y Troubleshooting

### Problemas Comunes

**🔴 Error de conexión entre servicios**
```bash
# Verificar que todos los contenedores estén corriendo
docker-compose ps

# Reiniciar servicios
docker-compose down && docker-compose up --build
```

**🔴 Base de datos no inicializada**
```bash
# Eliminar volúmenes y reiniciar
docker-compose down -v
docker-compose up --build
```

**🔴 Puerto ocupado**
```bash
# Verificar puertos en uso
netstat -tulpn | grep :4000
netstat -tulpn | grep :5173
netstat -tulpn | grep :5000

# Cambiar puertos en docker-compose.yml si es necesario
```


</div>