
# Cybership Carrier Integration Service

A carrier rate calculation service which features a modular monolith architecture that abstracts complex shipping provider logic behind a unified API.

##  Architecture & Design Patterns

### 1. Strategy & Provider Pattern
The core of the system is the `CarrierResolver`. It implements a **Registry/Strategy pattern**, allowing the `ShippingService` to remain carrier-agnostic. 
- **Benefit:** Adding a new carrier (e.g., FedEx) requires zero changes to the Service or Controller layers; you simply implement the `CarrierProvider` interface and register it.

### 2. Automated OAuth 2.0 Lifecycle
The `UPSProvider` encapsulates its own authentication logic. 
- **In-Memory Caching:** Tokens are stored and reused.
- **Safety Buffer:** I implemented a 300,000ms (5-minute) clock-skew buffer. This prevents "Race Condition" failures where a token expires while a request is in transit.

### 3. Schema-First Validation
Utilizing **TSOA** for OpenAPI/Swagger generation and **Zod** for runtime request validation.
- **Fail Fast:** Requests are validated at the Controller entry point (`RateRequestSchema.parse`), ensuring the internal service logic never processes malformed data.

### 4. Dependency Injection (DI)
The project uses a container-based approach (`shippingServiceInstance`). This decoupling ensures that components are easily swappable for Unit Testing and Mocking.

##  How to Run

1. **Configure Environment:**
   Create a `.env` file with your UPS Developer credentials:
   ```env
   UPS_CLIENT_ID=...
   UPS_CLIENT_SECRET=...
   UPS_ACCOUNT_NUMBER=...
   UPS_AUTH_URL=https://wwwcie.ups.com
   UPS_BASE_URL=https://wwwcie.ups.com


##  Further improvements if given more time

### 1. Unified Response & Global Error Handling
Currently, the service returns raw data or throws standard `Error` objects. I would implement a centralized `ResponseManager` to enforce a consistent API contract:
- **Predictable Envelopes:** All responses would follow a `{ success: boolean, data?: T, message?: string }` structure.
- **Global Error Interceptor:** Implement a custom `ErrorHandler` middleware for TSOA/Express to catch exceptions globally. This prevents sensitive stack traces from leaking to the client and maps internal errors (like UPS 401s) to user-friendly HTTP status codes (e.g., 502 Bad Gateway).
### 2. Move the token and expiry from the UPSProvider instance to Redis.


