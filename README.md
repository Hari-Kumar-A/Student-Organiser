# Student-Organiser 
### Student Organiser , a student-friendly application for academic needs.

 ### :hammer_and_wrench: Tech Stack :
<div>
   <img src="https://cdn.icon-icons.com/icons2/2107/PNG/512/file_type_ejs_icon_130626.png"  title="EJS" alt="EJS" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-plain-wordmark.svg"  title="CSS3" alt="CSS" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" title="HTML5" alt="HTML" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/mongodb/mongodb-original.svg" title="Mongodb" alt="Mongodb" width="40" height="40"/>&nbsp; 
  <img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg" title="NodeJS" alt="NodeJS" width="40" height="40"/>&nbsp; 
  <img src="https://github.com/devicons/devicon/blob/master/icons/express/express-original.svg" title="Expres" alt="Express" width="40" height="40"/>&nbsp;    
</div>
 
---
# Features
1) Authentication System
2) Usage of Express Session
3) MongoDB CRUD Operation
4) EJS , Partials, Layouts
5) Add , Edit, Delete, Search Filter for Events and Expenses
6) Calendaer View
7) Usage of Full Calendar
8) Syncing with Google Calendar only after setting up googlecalendarID and API credentials in .env file   
12) They can upload their Grades and calculate GPA
13) Students can add expenses (date, amount, category)
14) They can set budget limit for category wise( like stationary, food, accomodation)
15) They can view by categorywise by search filter
 
## Installation and Setup

1. Fork the Repo
2. Clone the Repo:
   
```bash
$ git clone https://github.com/Hari-Kumar-A/Student-Organiser.git 
cd Student-Organiser/
 ```
3. Install the packages:
```bash
npm install
```

4. Setup env file, refer [Google-Calendar API Integration](https://stateful.com/blog/google-calendar-api-javascript/) 

```bash
copy .env.example   .env
``` 

5. Setup keys.json file, refer [Google-Calendar API Integration](https://stateful.com/blog/google-calendar-api-javascript/) 

```bash
copy keys.json.example   keys.json
```
6. Make sure, mongoDB is installed and is connected.
 

 

The server should be running at your 127.0.0.1 port 3002 (or the port specified in `.env`).

 ---

## Resources
[HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/) \
[EJS](https://ejs.co/) \
[CSS](https://www.w3schools.com/cssref/index.php/) \
[Mongoose](https://mongoosejs.com/docs/)\
[Express Js](https://expressjs.com/) \
[Google-Calendar API Integration](https://stateful.com/blog/google-calendar-api-javascript/) \
[Bcrypt](https://www.npmjs.com/package/bcrypt/) 

## Contributing Guidelines
1. Add a reference to the original repository.
``` bash
https://github.com/Hari-Kumar-A/Student-Organiser
```
2. Check the remotes for this repository.
``` bash
git remote -v
```
3. Always take a pull from the upstream repository to your main branch to keep it at par with the main project(updated repository).
``` bash
git pull upstream main
```
4. Once the issue is assigned.
   Create a new branch (DO NOT name it MAIN or MASTER or anything random). like to enhance blogs,it can be "enhanceBlog"
``` bash
git checkout -b <your_branch_name>
```
5. Perfom your desired changes to the code base.
   - Make sure that you do not change any code unrelated to the task that you have been assigned
   - Do not mess up the directory structure
   - Preview your changes and test them properly before proceding ahead
6. Track your changes:
```bash
git add.
```
7. Commit your changes:
```bash
git commit -m "Relevant message"  (usually title of the pull request)
```
8. Push the committed changes in your feature branch to your remote repo:
``` bash
git push -u origin <your_branch_name>
```
9. To create a pull request, click on compare and pull requests. Please ensure you compare your feature branch to the desired branch of the repo you are suppose to make a PR to.
<img width="313" alt="image" src="https://github.com/Hari-Kumar-A/Student-Organiser/assets/125040587/c5e53d38-6868-43b5-8057-839cb10c2448">

10. Add an appropriate title and description to your pull request that explains your changes and efforts done.
11. Click on
 ```bash
Create Pull Request
```
12. Make sure to refer the respective issue in the respective PR using phrases like Resolves #issue_number or Fixes #issue_number. Here's an example to raise a PR:
``` bash
 Fixes #2

# Work Done:
- Fixed blog page
- Made the Favicon more optimized
- ...
# Relevant Screenshots
```
13.  Hurray ❗ You have made a PR to the awesome Student Organiser project 💥 . Wait your PR to be reviewed. 




## ScreenShots
<img width="959" alt="image" src="https://github.com/Hari-Kumar-A/Student-Organiser/assets/125040587/ed27baac-6f48-44b3-9e1b-e932a553dd58">
<img width="959" alt="image" src="https://github.com/Hari-Kumar-A/Student-Organiser/assets/125040587/74b1cca7-a969-445f-b303-30036db91be3">
<img width="587" alt="image" src="https://github.com/Hari-Kumar-A/Student-Organiser/assets/125040587/506a4c50-e504-43ab-ac11-944f01d0e173">


 
 

