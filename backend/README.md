# Wildlife Backend API

Spring Boot REST API for the Wildlife Website application.

## Technology Stack

- **Java 17**
- **Spring Boot 3.2.1**
- **Spring Data JPA**
- **H2 Database** (in-memory for development)
- **Maven** (dependency management)
- **Lombok** (reduces boilerplate)

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/wildlife/backend/
│   │   │   ├── config/          # Configuration classes
│   │   │   ├── controller/      # REST controllers
│   │   │   ├── dto/             # Data Transfer Objects
│   │   │   ├── model/           # JPA entities
│   │   │   ├── repository/      # JPA repositories
│   │   │   ├── service/         # Business logic
│   │   │   └── WildlifeBackendApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── application-dev.properties
│   │       └── application-prod.properties
│   └── test/
│       └── java/com/wildlife/backend/
└── pom.xml
```

## Prerequisites

- Java 17 or higher
- Maven 3.6+ (or use the included Maven wrapper)

## Getting Started

### 1. Build the Project

```bash
cd backend
mvn clean install
```

### 2. Run the Application

**Development mode:**
```bash
mvn spring-boot:run
```

**With specific profile:**
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

### 3. Access the Application

- **API Base URL:** http://localhost:8080/api
- **Health Check:** http://localhost:8080/api/health
- **H2 Console:** http://localhost:8080/api/h2-console
  - JDBC URL: `jdbc:h2:mem:wildlifedb`
  - Username: `sa`
  - Password: (leave empty)

## Configuration

### Application Properties

Configuration files are located in `src/main/resources/`:

- `application.properties` - Base configuration
- `application-dev.properties` - Development profile
- `application-prod.properties` - Production profile

### Key Configuration

**Server:**
- Port: 8080
- Context Path: `/api`

**Database:**
- Type: H2 (in-memory)
- URL: `jdbc:h2:mem:wildlifedb`
- Console: Enabled (dev only)

**CORS:**
- Allowed Origins: `http://localhost:4200` (Angular frontend)
- Allowed Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH

## Available Endpoints

### Health Check

```http
GET /api/health
```

Response:
```json
{
  "status": "UP",
  "timestamp": "2024-01-07T12:00:00",
  "service": "Wildlife Backend API",
  "version": "1.0.0"
}
```

## Development

### Hot Reload

Spring Boot DevTools is included for automatic restarts during development.

### Running Tests

```bash
mvn test
```

### Creating a JAR

```bash
mvn clean package
```

The JAR will be created in `target/wildlife-backend-1.0.0.jar`

### Running the JAR

```bash
java -jar target/wildlife-backend-1.0.0.jar
```

## Future API Endpoints

When connecting with the Angular frontend, consider these endpoints:

### Comments API
- `GET /api/comments` - Get all comments
- `POST /api/comments` - Create a new comment
- `GET /api/comments/{id}` - Get a specific comment
- `DELETE /api/comments/{id}` - Delete a comment

### Bears API (if moving from Wikipedia)
- `GET /api/bears` - Get all bears
- `GET /api/bears/{id}` - Get a specific bear

## Database

The application uses H2 in-memory database for development. Data is reset on each restart.

For production, update `application-prod.properties` to use a persistent database like PostgreSQL or MySQL.

## Troubleshooting

### Port Already in Use

Change the port in `application.properties`:
```properties
server.port=8081
```

### CORS Issues

Update allowed origins in `CorsConfig.java` or `application.properties`.

## Next Steps

1. ✅ Backend structure created
2. ⏳ Create entity models (Comment, etc.)
3. ⏳ Create repositories
4. ⏳ Create services
5. ⏳ Create REST controllers
6. ⏳ Connect with Angular frontend

## Support

- Spring Boot Documentation: https://spring.io/projects/spring-boot
- Spring Data JPA: https://spring.io/projects/spring-data-jpa
- Maven: https://maven.apache.org/

