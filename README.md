# Notas-poli
api rest with node js developed as homework, the general idea is provide back-end services that allow 3 kinds of user do different
thing with authentification
*admin: this can create users, courses(with his students) throug massive file charged, also can send emails to teacher and students to remaind them
to uplod notes.
*teacher: this can create activities for his courses and change the notes of the students.
*student: this can see the notes of his course.


## Getting Started

have running a mongodb instance of have one in the internet 

in the folder of the project in the console
npm init
create a folder config inside it a file called dev.env whith the next enviroment variables
PORT=the port the application should run
SENDGRID_API_KEY=a valid api key for the sengrid api
JWT_SECRET=any string that allow to encrytep the token 
MONGODB_URL_NOTAS=the url of the mongodb databse if is running locally probably is something like:mongodb://127.0.0.1:27017/notas_poli

### Prerequisites

nodejs
mongodb

