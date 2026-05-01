from pydantic import BaseModel, EmailStr, field_validator, ValidationInfo

class UserCreate(BaseModel):
    full_name: str
    age: int
    occupation: str
    email: EmailStr
    password: str
    confirm_password: str

    @field_validator("confirm_password")
    def match_password(cls, v, info: ValidationInfo):
        if v != info.data.get("password"):
            raise ValueError("Passwords do not match")
        return v
    
class UserLogin(BaseModel):
    email:EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "Bearer"