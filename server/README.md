# Proofly

Proofly is a production-ready, developer-focused backend platform for Self-Sovereign Identity (SSI) and Verifiable Credentials. It provides secure, modular APIs for creating Decentralized Identifiers (DIDs), issuing and verifying credentials, and encrypted credential storage.

## 🚀 Live API

**Production API**: https://proofly-api.onrender.com

- **📖 Interactive Documentation**: https://proofly-api.onrender.com/docs
- **🔍 Health Check**: https://proofly-api.onrender.com/health
- **📋 API Info**: https://proofly-api.onrender.com/

## Features
- Create W3C-compliant DIDs
- Issue and verify verifiable credentials (JWT/JSON-LD)
- Encrypted credential storage and retrieval
- Credential revocation
- Audit logging for all credential operations
- Rate limiting and API key authentication
- Production-ready with PostgreSQL support
- FastAPI-powered OpenAPI docs

## Tech Stack
- **FastAPI** (Python)
- **PostgreSQL** (production) / **SQLite** (development)
- **cryptography** (for signing/verifying)
- **Pydantic** (data validation)
- **Docker** (containerization)

## Quick Start

### Development
```bash
# Install dependencies
pip install -r requirements.txt

# Run with SQLite (default)
uvicorn app.main:app --reload

# Or with Docker Compose (PostgreSQL)
docker-compose up --build
```

### Production Deployment

#### 1. Environment Setup
```bash
# Copy environment template
cp env.example .env

# Edit .env with your production values
DATABASE_URL=postgresql://user:password@host:5432/dbname
SECRET_KEY=your-secure-secret-key
API_KEY=your-api-key
ENVIRONMENT=production
```

#### 2. Docker Deployment
```bash
# Build and run
docker build -t proofly .
docker run -p 8000:8000 --env-file .env proofly
```

#### 3. Cloud Deployment Options

**Railway (Recommended for MVP):**
- Connect GitHub repo
- Set environment variables
- Deploy automatically

**Render (Recommended for Free Tier):**
1. **Fork/Upload to GitHub** - Ensure your code is in a GitHub repository
2. **Create Render Account** - Sign up at [render.com](https://render.com)
3. **Create New Web Service** - Click "New +" → "Web Service"
4. **Connect Repository** - Connect your GitHub repo
5. **Configure Service:**
   - **Name**: `proofly-api` (or your preferred name)
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
6. **Add PostgreSQL Database:**
   - Create new PostgreSQL database in Render
   - Copy the connection string
7. **Set Environment Variables:**
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `SECRET_KEY`: Generate a secure random string
   - `API_KEY`: Generate a secure API key
   - `ENVIRONMENT`: `production`
   - `ALLOWED_ORIGINS`: Your domain(s) or `*` for testing
8. **Deploy** - Click "Create Web Service"

**Alternative: Use render.yaml (Blueprint)**
- Push the included `render.yaml` to your repo
- Use "Blueprint" deployment in Render
- Automatically sets up web service + database

**AWS ECS:**
- Use provided Dockerfile
- Set up ECS cluster
- Configure environment variables

## API Endpoints

### Public Endpoints
- `GET /` - API info
- `GET /health` - Health check
- `GET /docs` - OpenAPI documentation

### Protected Endpoints (Require X-API-Key header)
- `POST /did/create` — Create a new DID
- `POST /credential/issue` — Issue a verifiable credential
- `POST /credential/verify` — Verify a credential
- `POST /credential/store` — Store a credential (encrypted)
- `POST /credential/retrieve` — Retrieve and decrypt a stored credential
- `POST /credential/revoke` — Revoke a credential
- `GET /audit/logs` — View audit logs

## Rate Limiting
- Default: 60 requests per minute per IP
- Configurable via `RATE_LIMIT_PER_MINUTE` environment variable

## Security Features
- API key authentication
- CORS protection
- Rate limiting
- Request logging
- Trusted host validation (production)

## Testing
```bash
# Run all tests
pytest tests/test_credentials.py -v

# Run with coverage
pytest --cov=app tests/
```

## Monitoring
- Health check endpoint: `/health`
- Request/response logging
- Audit trail for all operations
- Structured JSON logging

---
Proofly — Secure, verifiable identity for developers. 