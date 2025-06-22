import pytest
import os
import tempfile
from fastapi.testclient import TestClient
from app.main import app
from app.config import settings

# Override database URL for testing
@pytest.fixture(scope="session", autouse=True)
def setup_test_db():
    """Set up test database using SQLite."""
    # Create a temporary SQLite database for testing
    temp_db = tempfile.NamedTemporaryFile(delete=False, suffix=".db")
    temp_db.close()
    
    # Override the DATABASE_URL for testing
    original_db_url = os.environ.get("DATABASE_URL")
    os.environ["DATABASE_URL"] = f"sqlite:///{temp_db.name}"
    
    # Re-import app with new database URL
    from app.main import app
    from database.init_db import init_db
    
    # Initialize test database
    init_db()
    
    yield
    
    # Cleanup
    if original_db_url:
        os.environ["DATABASE_URL"] = original_db_url
    else:
        del os.environ["DATABASE_URL"]
    
    # Remove temporary database file
    try:
        os.unlink(temp_db.name)
    except:
        pass

@pytest.fixture
def client():
    """Create a test client."""
    return TestClient(app) 