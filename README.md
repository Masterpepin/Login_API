
# This is an API for doing the basics Create,Read,Update and Delete (CRUD).

Requirements in your computer for this API to work:
- Git
- Docker
Steps:
- 1: clone this repo ```git clone ```
- 2: Move to the repo ```cd```
- 3: Make sure inside it you have access to docker-compose.yml and run ```docker-compose up --build```
- 4: Once Docker is running you need to follow this steps for creating the table user (I hope to solve this soon to make it automatically):
  - 1: run ```sudo docker-compose exec web alembic upgrade head```
  - 2: now enter docker's web bash ```sudo docker-compose exec web bash``` and execute the following inside it:
    -```mkdir -p /app/alembic/versions```
    -```exit```
  - 3: run ```sudo docker-compose exec web alembic revision --autogenerate -m "Create users table"``` to create the users table
- 4: Once you have it up and running you should be able to search "http://localhost:8000/user/"
