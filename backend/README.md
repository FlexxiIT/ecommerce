
# Endpoints

*  {url}/api/auth/register (POST) 

    Response en caso de éxito :
        {
        "user": {
            "clientEntity": {
                "id": "7725744e-99a8-4ed5-b1f0-c81916e342c6",
                "email": "enzo03453@gmail.com",
                "emailValidated": false,
                "DNI": "45031205",
                "name": "Enzo",
                "surname": "Petela",
                "phoneNumber": "12345678"
            }
        },
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc3MjU3NDRlLTk5YTgtNGVkNS1iMWYwLWM4MTkxNmUzNDJjNiIsImlhdCI6MTcxMzM3NjQ3MCwiZXhwIjoxNzEzMzgzNjcwfQ.tCIWuVR8jtqeuJzPDva79nDMCF1FOAR_J3VWkzX47mc"
        }

*  {url}/api/auth/login (POST) 

    Response en caso de éxito:
        {
        "user": {
            "user": {
                "id": "7725744e-99a8-4ed5-b1f0-c81916e342c6",
                "email": "enzo03453@gmail.com",
                "emailValidated": false,
                "DNI": "45031205",
                "name": "Enzo",
                "surname": "Petela",
                "phoneNumber": "12345678"
            },
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc3MjU3NDRlLTk5YTgtNGVkNS1iMWYwLWM4MTkxNmUzNDJjNiIsImlhdCI6MTcxMzM3NzA4OCwiZXhwIjoxNzEzMzg0Mjg4fQ.  Eb0tFiSRvtGgHqv5lxUFnujJgTjhXZ6Pf2-1UImsuKI"
        }
}

*  {url}/api/auth/validate-email (GET) 