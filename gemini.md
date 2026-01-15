# GEMINI.md - Cedra Backend

This file provides a comprehensive overview of the Cedra Backend project, its architecture, and how to work with it.

## Project Overview

Cedra Backend is a high-performance B2B e-commerce platform written in Go. It's designed for high-concurrency workloads and utilizes a modular, domain-driven architecture. The project leverages several key technologies:

*   **FastHTTP:** For high-performance HTTP networking, providing low latency and high request throughput.
*   **ScyllaDB:** A NoSQL database used as the primary data store, with data logically separated into different keyspaces for each domain.
*   **Elasticsearch:** For advanced search capabilities, including visual search using k-NN.
*   **Redis:** For caching and session management.
*   **AI Stack (Ollama - currently in use; vLLM - planned for 2026):** For sovereign AI features, including advanced demand forecasting, visual search, AI-powered product descriptions, a B2B copilot, dynamic pricing, and voice commerce. Ollama is currently integrated for its ease of use and local deployment capabilities, with vLLM integration planned for higher performance and multi-agent orchestration in 2026 as per the project roadmap.

The project is structured in a layered architecture:

*   **`cmd/server/main.go`**: The main entry point of the application, responsible for initializing the server, database connections, and all the application's components.
*   **`internal/handlers`**: Contains the HTTP handlers that receive and respond to client requests.
*   **`internal/services`**: Contains the business logic of the application, organized by domain (e.g., `ai`, `admin`, `product`, `order`).
*   **`internal/repositories`**: Contains the code responsible for data access, interacting with ScyllaDB and Elasticsearch.
*   **`internal/utils`**: Contains utility functions for configuration, database connections, middleware, and routing.

## Building and Running

The project uses a `Makefile` to simplify common development tasks.

### Key Commands

*   **`make help`**: Displays a list of all available commands.
*   **`make deps`**: Installs all the necessary dependencies.
*   **`make build`**: Compiles the application into an optimized binary located in the `./bin` directory.
*   **`make run-fasthttp`**: Starts the server using FastHTTP (recommended for production and development).
*   **`make test`**: Runs the test suite.
*   **`make dev`**: A convenient command for development that builds the email templates and starts the server in hot-reload mode.

### Quick Start

1.  **Configuration:**
    ```bash
    cp .env.example .env
    ```
    Update the `.env` file with your local configuration for ScyllaDB, Elasticsearch, and other services.

2.  **Run the server:**
    ```bash
    make dev
    ```

3.  **Access the API:**
    The server will be running on `http://localhost:8080`. You can access the Swagger documentation at `http://localhost:8080/swagger/index.html`.

## Development Conventions

*   **Domain-Driven Design (DDD):** The codebase is organized by domain, with each domain having its own handlers, services, and repositories. This promotes modularity and separation of concerns.
*   **Dependency Injection:** The application uses a container-based approach to manage dependencies. The `serviceContainer` and `handlerContainer` are responsible for initializing and injecting dependencies.
*   **Testing:** The project has a test suite that can be run with `make test`. All new features and bug fixes should be accompanied by corresponding tests.
*   **Code Style:** The project follows the standard Go formatting and linting guidelines. Use `go fmt` and `golangci-lint` to ensure your code is compliant.
*   **Commit Messages:** Follow the conventional commit message format (e.g., `feat: add new feature`, `fix: fix a bug`).