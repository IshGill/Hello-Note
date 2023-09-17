<br />
<div align="center">
    <h1>Hello-Note</h1>
    <a href="https://freeimage.host/"><img src="https://iili.io/DqvMvf.png" alt="DqvMvf.png" border="0"></a>
  <p align="center">
    A Multi-platform Note Taking Solution 
    <br>
    For Computer Science & Software Engineering Students! 
  </p>
</div>

## Home Page
![0](https://user-images.githubusercontent.com/57751792/197384348-14ee1e59-fc52-43de-8bf2-b1731e978b73.png)
## Code Compiler
![0](https://user-images.githubusercontent.com/57751792/197384345-4f1f6032-658b-4e5d-a399-f03e2a0e71f5.png)
## Rich Text Editor
**Note taking functionalities:**
![0](https://user-images.githubusercontent.com/57751792/197384533-3b33d73c-9d12-4520-ae80-7a8889c8ff0c.png)

**Video embedding functionalities:**
![0](https://user-images.githubusercontent.com/57751792/197384544-95edfb4d-266d-497c-b878-d8c6bb33fb86.png)
## Drawing Board
![0](https://user-images.githubusercontent.com/57751792/197384327-daf51029-cff3-4fcd-b320-80a0110a7c8f.png)
## Workspace View
![0](https://user-images.githubusercontent.com/57751792/197384334-af334ccf-1cea-4f70-afdb-7c4b85cff411.png)
## Login Page
![0](https://user-images.githubusercontent.com/57751792/197384305-25e837a1-bc24-43d4-a28c-2a0d79fabcda.png)
## Registration Page
![0](https://user-images.githubusercontent.com/57751792/197384313-381c2413-7566-47be-979b-f417db6f58f2.png)

## Project Description
It is no secret that taking notes can positively affect students' learning and performance. Computer Science/ Programming students are no different; however, these students also require a vast range of tools, from an IDE and a Text Editor to a Raster graphics editor (Paint). All those tools lack cohesiveness and may result in a frustrating coding journey.

Programming students tend to spend more time practising and writing code; although this has been proven to be effective when trying to improve their coding skills, certain concepts and techniques can be studied effectively with the use of notes.

This is why we have developed Hello-Note, to provide a resolution to many of these note taking problems computer science students encounter. Hello-Note provides features such as:

<ul>
    <li><b>Code compiler</b> which supports the most common and popualr programming languages such as C++, Python and Java. It also provides the runtime of your code, helping you to implement more efficient solutions!</li>
    <li><b>Rich Text Editor</b> which allows you to write detailed notes about your computer science studies, which can then be saved to the database. The rich text editor also provides functionalities to embed videos and pdf files.</li>
    <li><b>Drawing board</b>, this is perfect for writing mathematical formulas such as runtime equations.</li>
    <li><b>Work space section</b>, this is your hub where you can access all of the code compiler, editor and drawing board functionalities from one place. 
</ul>

## Instructions to run Hello-Note

To Run this project, you must create two .env files, one in the backend folder, the other in in the frontend.

The frontend env contains this.

    JUDGE0_URL = "http://localhost:2358"

    FIRE_BASE_CONFIG = {
    apiKey: "AIzaSyCFELA5fSmuvJVpXCZiuKasipvy1ZN2kyc",
    authDomain: "hello-note-51da3.firebaseapp.com",
    projectId: "hello-note-51da3",
    storageBucket: "hello-note-51da3.appspot.com",
    messagingSenderId: "982960305518",
    appId: "1:982960305518:web:0f96edb321f272d9c4fd7f",
    measurementId: "G-6C1GK6MFCC",
    };

For frontend, [Fibase Authentication](https://firebase.google.com/) was used, you may want to create your own firebase project and use that specific configuration else, a configuration already exists on Firebase.js

The backend env contains this, the top mongo uri is for developing from visual studio code and the bottom one is for running the application with docker.

    JWT_SECRET = 8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb

    PORT = 3001

    # MONGO_URI = mongodb://localhost:27017/
    MONGO_URI = mongodb://admin:admin@mongo:27017/Properties?authSource=admin

If one is using the application to develop, the next step would be to open visual studio code, and run the following commands:

    npm install

    npm start
    
### Judge0 Code Compiler Setup
For the code compiler we used Judge0 which is Robust, scalable, and open-source online code execution system that can be used to build a wide range of applications that need online code execution features. This needs to be self hosted.

### With HTTP

**1. Install [Docker](https://docs.docker.com) and [Docker Compose](https://docs.docker.com/compose).**

**2. Download and extract the release archive:**

```
wget https://github.com/judge0/judge0/releases/download/v1.13.0/judge0-v1.13.0.zip
unzip judge0-v1.13.0.zip
```

**3. Run all services and wait a few seconds until everything is initialized:**

```
cd judge0-v1.13.0
docker-compose up -d db redis
sleep 10s
docker-compose up -d
sleep 5s
```

**4. Your instance of Judge0 CE v1.13.0 is now available at `http://<IP ADDRESS OF YOUR SERVER>:2358`.**

However if one is using docker to test the application, you open visual studio as before, but instead run the command:

    docker-compose up --build

After this, you would open your browser to localhost:3000

The app can be deployed using firebase and accessed using the url that is defined.

<b>Judge0:</b> <a>https://judge0.com/</a><br>
<b>Judge0 CHANGELOG:</b> <a>https://github.com/judge0/judge0/blob/master/CHANGELOG.md</a><br>
<b>MongoDB:</b> <a>https://www.mongodb.com/try/download/community-kubernetes-operator</a><br>

## Electron Desktop App
```
cd frontend
npm run electron-dev
```
Note that running this code will create a dist folder containing all installation files.

## Project Management Tools
<b>Jira</b>: <a>https://team35capstone399.atlassian.net/browse/T35-22</a><br>
<b>GitHub</b>: <a>https://github.com/orgs/uoa-compsci399-s2-2022/projects/5</a>

## Technologies Used
<ul>
    <li>Github</li>
    <li>MaterialUI</li>
    <li>Axios</li>
    <li>ReactJS</li>
    <li>NodeJS</li>
    <li>Express</li>
    <li>MongoDB</li>
    <li>QuillJS</li>
    <li>Electron</li>
    <li>Docker</li>
    <li>Excalidraw</li>
    <li>Judge0 Code Compiler</li>
    <li>CodeMirror IDE</li>
    <li>Firebase</li>
    <li>Socket.IO</li>
</ul>

## Future Refinements
<ul>
    <li>UI refinements</li>
    <li>Bugfixing</li>
    <li>Extend integration between main note-taking components</li>
</ul>

## Team Hello-Note
| Name | Role
| --- | --- |
| Kieren Tyler | Team Leader, Backend Dev |
| Nishan Basthian | Backend Dev |
| Ish Gill | Backend Dev |
| Hayden Gray | Frontend Dev |
| Tushar Sharma | Frontend Dev |
| Julianne Van De Merwe | Frontend Dev |







