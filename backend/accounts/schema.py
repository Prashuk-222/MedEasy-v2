API_SCHEMA = {
    "endpoints": [
        {
            "path": "api/token/",
            "methods": ["POST"],
            "description": "Obtain access and refresh tokens by providing user credentials (email and password).",
            "payload_example": {
                "email": "user@example.com",
                "password": "userpassword123"
            },
            "response_example": {
                "access": "<JWT Access Token>",
                "refresh": "<JWT Refresh Token>"
            },
        },
        {
            "path": "api/token/refresh/",
            "methods": ["POST"],
            "description": "Refresh the access token using a valid refresh token.",
            "payload_example": {
                "refresh": "<JWT Refresh Token>"
            },
            "response_example": {
                "access": "<New JWT Access Token>"
            },
        },
        {
            "path": "api/register/",
            "methods": ["POST"],
            "description": "Register a new user by providing the required details.",
            "payload_example": {
                "email": "newuser@example.com",
                "user_name": "John",
                "password": "securepassword123"
            },
            "response_example": {
                "id": "<User ID>",
                "email": "newuser@example.com",
                "user_name": "John",
            },
        },
    ]
}

if __name__ == "__main__":
    import json
    print(json.dumps(API_SCHEMA, indent=4))
