# Why Rest

- Simple, Stateless, scalable, cacheable
- Combined with HTTP without additional abs
- developers and it's industry standard
- Rest API vs GraphQL vs  GRPC

## API

- Application programmable interface
- Contract between rules and expectation
- **facilities abstraction**

## REST

- Introduction 2000
- REST Has 6 constraints
  - Uniform interface
    - Component both need to communicate through uniform interface
      - Identify different resources: URL
      - manipulate this resources through representations: HTTP Method + Body
      - self-descriptive: **Request Response**
      - hypermedia as the engine of application state (HATEOS): media types
        - hypermedia = responses
        - How to fetch detail about user, how to fetch about user id
        - So restful is need to know what's next
  - Client-server
    - Separation of concern
  - stateless
    - One request should not depend on any other request
    - Server is not allowed to store client state
    - **Any server must be able handle request from any client at any time**
  - cacheable
    - Response must be implicitly cacheable or non-cacheable
  - layered system
    - Each component can not see beyond interaction component
  - Code on demand (Optional Constraints)
    - Allow client functionality to be extended
- REST - Resources
  - **Resources is anything that can be NAMED**
  - Do not have to be mutually exclusive

### HTTP Version

- http 1.1 1997
- http 2 2015
- http 3 2021

### HTTP Method

- GET
  - Request REsponse
- HEAD
  - same as get but don't response id
- OPTIONS
  - Ask http to which methods are allowed
- TRACE
  - ask server to send back request
- PUT
  - Create or update resources, commonly used for specific idempotent
  - Update full resources, always need to send
  - /users/1, /posts/3
- DELETE
  - Delete resources
- POST
  - Post can be really used for anything
  - To create something new
  - Can be used as catch-all for unsafe operation
- PATCH
  - Partial update to resources
- CONNECT
  - Proxy servers

### Safe Method

- Safe if request doesn't alter state of the server
- The client does not request any server change
- Not generate much server load

### Idempotent

- An HTTP Method is idempotent is like request multiple but still have the same 1

## Web API Design

- URLS
- Headers
- Responses
- Status Codes
- No 500 status code for bad example

### API First

- Development of the API always start and begin with the design
- The design should be master of truth
- Minimal API Surface (KISS, YAGNI)
  - KISS: Keep it simple stupid
  - YAGNI: You ain't gonna need it
  - Do not exposes unessecary resources
- Should be designed around
  - Resources
    - Identify by URl
  - Representations
    - Media Type
  - Actions
    - HTTP Method act upon resources
    - /login, /search, /emails/confirm

## General Best Practices

- Resources names should be prulalized
- Paths should not have empty segments or trailing slashes
- Paths should be as verb free as possible
- sub resources are identify via path segments
- minimize resource nesting
- naming conventions for paths and query parameters
- Versioning - anywhere
  - /v1/users (URL Path, preferred)
  - /users?version=1 (query params)
  - v1.example.com/users (subdomain)
  - GET / USERS (Header)
    - API-VERSION: 1
  - Accept: application/vnd.example.users.v1 + json (content negotiation versioning)
- Backwards compatibility
- application/problem+json for popular API producing json
- Error should be meaningful for consumer and not exposes internal info and make it usable and actionable
- Collections
  - All endpoints that return a collection of an arbirtraty size must be paginated
  - limit and offest
    - slower
    - easy to read and implement
    - Kalau data di delete jadi rusak
  - Cursor
    - Pros: faster
    - Cons: can't jump to any "page"
    - Cursor query parameter base64 encoding of information
    - Name
  - Support filtering and sorting
    - sort by
    - name
- Should be cached
  - Cache-control header
    - no-cache: You can store it but you need to validated before reuse
    - no-store: The content is not allowed to be store
    - private: only client can store the cache
    - max-age: in second
    - must-revalidate:  if cache expire client must revalidate
    - state-if-error: more robust for client
  - ETag: Entity Tag / Last Modified
    - If modified since
    - If none match
- All date is treated as unsafe
  - If your design doesn't acc, then implementation should not too
  - Validate the whole request before starting to process it
  - Aim to restrict types as much as possible
  - Auth options
    - OAuth 2.0
    - basic auth
    - api keys
    - JWT
- Avoid designing "Chatty" API
  - Don't send 5 request to achieve 1 operation
- All request should be atomic operation, request shouldn't have finished
- use UUIDs for id
- Multiple languages
  - Accept, accept-language, content-language
- A lot of data, supports header
  - Compression, Content-encoding

## OpenAPI

- Open API Specification based on the Swagger 2.0
- machine readable specification for an API
- should be self-contained as possbile
- allows tools to generate
  - Documentation
  - Client server implementations
  - mock server for testing
  - security scanners for scanning API

