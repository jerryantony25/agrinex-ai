import os
from functools import lru_cache
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "AGRINEX AI"
    PROJECT_VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    # API Prefix
    API_V1_STR: str = "/api"
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    ALLOWED_ORIGINS: str = "http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173,http://127.0.0.1:3000"
    
    # Database (Defaults to SQLite for local development, PostgreSQL ready in production)
    DATABASE_URL: str = "sqlite:///./agrinex.db"
    
    # AI Engine Settings
    AI_PROVIDER: str = "default"  # 'openai', 'openrouter', 'gemini', or 'default' (local intelligent agricultural engine)
    AI_API_KEY: str = ""
    AI_MODEL: str = "gpt-4o-mini"
    AI_API_BASE: str = "https://api.openai.com/v1"
    
    # Secret Key
    SECRET_KEY: str = "agrinex-secret-key-development"
    
    @property
    def cors_origins(self) -> List[str]:
        if not self.ALLOWED_ORIGINS:
            return ["*"]
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",") if origin.strip()]

    class Config:
        env_file = ".env"
        extra = "allow"

@lru_cache()
def get_settings() -> Settings:
    return Settings()

settings = get_settings()
