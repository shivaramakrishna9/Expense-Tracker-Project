from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URI: str
    SECRET_KEY: str

    class Config:
        env_file = ".env"

settings = Settings()