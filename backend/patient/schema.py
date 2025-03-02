API_SCHEMA = {
    "endpoints": [
        {
            "path": "api/patients/",
            "methods": ["GET"],
            "description": "Retrieve a list of all patients.",
            "payload_example": None,
            "response_example": [
                {
                    "id": "<Patient ID>",
                    "first_name": "John",
                    "last_name": "Doe",
                    "age": 30,
                    "email": "john.doe@example.com",
                    "phone_number": "+1234567890",
                    "profile_photo": "https://example.com/media/profile.jpg",
                    "registered_by": {
                        "id": "<User ID>",
                        "user_name": "admin",
                        "email": "admin@example.com"
                    },
                    "created_at": "2024-02-28T12:00:00Z",
                    "updated_at": "2024-02-28T12:30:00Z"
                }
            ],
        },
        {
            "path": "api/patients/",
            "methods": ["POST"],
            "description": "Create a new patient.",
            "payload_example": {
                "first_name": "Jane",
                "last_name": "Doe",
                "age": 25,
                "email": "jane.doe@example.com",
                "phone_number": "+9876543210",
                "profile_photo": "https://example.com/media/profile2.jpg",
            },
            "response_example": {
                "id": "<Patient ID>",
                "first_name": "Jane",
                "last_name": "Doe",
                "age": 25,
                "email": "jane.doe@example.com",
                "phone_number": "+9876543210",
                "profile_photo": None,
                "registered_by": {
                    "id": "<User ID>",
                    "user_name": "admin",
                    "email": "admin@example.com"
                },
                "created_at": "2024-02-28T12:10:00Z",
                "updated_at": "2024-02-28T12:10:00Z"
            },
        },
        {
            "path": "api/patients/<patient_id>/",
            "methods": ["GET"],
            "description": "Retrieve details of a specific patient.",
            "payload_example": None,
            "response_example": {
                "id": "<Patient ID>",
                "first_name": "John",
                "last_name": "Doe",
                "age": 30,
                "email": "john.doe@example.com",
                "phone_number": "+1234567890",
                "profile_photo": "https://example.com/media/profile.jpg",
                "registered_by": {
                    "id": "<User ID>",
                    "user_name": "admin",
                    "email": "admin@example.com"
                },
                "created_at": "2024-02-28T12:00:00Z",
                "updated_at": "2024-02-28T12:30:00Z"
            },
        },
        {
            "path": "api/patients/<patient_id>/",
            "methods": ["PUT", "PATCH"],
            "description": "Update details of a specific patient.",
            "payload_example": {
                "first_name": "John",
                "last_name": "Doe",
                "age": 31,
                "email": "john.new@example.com",
                "phone_number": "+1234567899"
            },
            "response_example": {
                "id": "<Patient ID>",
                "first_name": "John",
                "last_name": "Doe",
                "age": 31,
                "email": "john.new@example.com",
                "phone_number": "+1234567899",
                "profile_photo": "https://example.com/media/profile.jpg",
                "registered_by": {
                    "id": "<User ID>",
                    "user_name": "admin",
                    "email": "admin@example.com"
                },
                "created_at": "2024-02-28T12:00:00Z",
                "updated_at": "2024-02-28T12:45:00Z"
            },
        },
        {
            "path": "api/patients/<patient_id>/delete/",
            "methods": ["DELETE"],
            "description": "Delete a specific patient.",
            "payload_example": None,
            "response_example": {
                "message": "Patient deleted successfully."
            },
        }
    ]
}

if __name__ == "__main__":
    import json
    print(json.dumps(API_SCHEMA, indent=4))
