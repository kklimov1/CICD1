# Revature Full Stack Java Project 2 Demo

<br />

## Squawk

[Project Repo](https://github.com/221128-Java-Angular-AWS/P2)

<br>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#contributors">Contributors</a></li>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#tech-stack">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#module-break-down">Module Break Down</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>
<br>

<!-- CONTACT -->

# Contributors

### Kirill Klimov - kirill674@revature.net

 <img src="src\ui\src\assets\profilepic.jpg" alt="KirillPortrait" width="80" height="80">

[![linkedin-shield]][kirill-linkedin]
[![github-shield]][kirill-github]


<br>

### Travis Morse - travis741@revature.net

 <img src="src\ui\src\assets\travis_morse.jpg" alt="TravisPortrait" width="80" height="80">

[![linkedin-shield]][travism-linkedin]
[![github-shield]][travism-github]

<br>

### Audie Ni - audie520@revature.net

 <img src="src\ui\src\assets\profilepic.jpg" alt="Logo" width="80" height="80">

[![linkedin-shield]][audie-linkedin]
[![github-shield]][audie-github]

<br>

### Brayden Nordine - brayden018@revature.net

 <img src="src\ui\src\assets\profilepic.jpg" alt="Logo" width="80" height="80">

[![linkedin-shield]][brayden-linkedin]
[![github-shield]][brayden-github]

<br>

### William Osborne - william185@revature.net

 <img src="src\ui\src\assets\profilepic.jpg" alt="Logo" width="80" height="80">

[![linkedin-shield]][william-linkedin]
[![github-shield]][william-github]

<br>

### Travis Pomeroy - travis928@revature.net

 <img src="src\ui\src\assets\profilepic.jpg" alt="Logo" width="80" height="80">

[![linkedin-shield]][travisp-linkedin]
[![github-shield]][travisp-github]

<br>

### Matthew Shen - matthew945@revature.net

 <img src="src\ui\src\assets\profilepic.jpg" alt="Logo" width="80" height="80">

[![linkedin-shield]][matthew-linkedin]
[![github-shield]][matthew-github]

<br>

<!-- ABOUT THE PROJECT -->

# About The Project

<br>
<div align="center">
<img src="src\ui\src\assets\iconSquawk.png" width="400" height="auto" alt="Squawk Icon"/>
</div><br><br>

Squawk was a collaborative project produced by the trainees of the Revature Next Gen Java AWS Angular v3.2 training course. This project aimed to create a social media website based off of a set
of provided project requirements.

<br>

# Overview

<br>

Our team built out this project from an empty repo over the course of 3 weeks. We were expected to use the tools as we learned them, observe AGILE practices, and continue other training while
the project was underway.

Team Member Expectations and Workflow:

- Independently developed project components while maintaining communication with other team members
- Participated in daily standups to communicate progress, plans, and blockers
- Maintained a ticketing system to track progress
- Exceed expectations by implementing stretch goals on top of the baseline expectations

### Tech Stack

- [Angular](https://angular.io/)
- [Spring](https://spring.io/)
- [RxJS](https://rxjs.dev/)
- [PostGreSQL](https://www.postgresql.org/)

<br>

<!-- GETTING STARTED -->

# Getting Started

To explore the project, follow the instructions below.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/221128-Java-Angular-AWS/P2.git
   ```

2. Navigate to the UI folder
   ```
   cd src/ui
   ```

3. Install NPM packages
   ```sh
   npm install
   ```

4. Navigate to src/main/java/come/revature, and run SquawkApplication.java to run the TomCat server

5. Serve the Angular application from the UI folder
   ```sh
    ng serve --open
   ```
6. Navigate to `localhost:4200` in your browser

<br><br>


<!-- USAGE EXAMPLES -->

# Page Overviews

> ## Login/Register

<br>
<div align="center">
<img src="src\ui\src\assets\iconSquawk.png" width="400" height="auto" alt="Login and Registration"/>
</div><br><br>

Our bespoke login/register page allows for users to create an account or log into an existing account. Usernames and passwords are validated as the user fills in the inputs, and passwords
are hashed before being stored in the database for increased security. A cookie is generated to maintain a seamless user session experience. Optional information is also collected
during registration to populate the user profile.

<br>

> ## Home

<br>

<div align="center">
<img src="src\ui\src\assets\iconSquawk.png" width="400" height="auto" alt="Home Feed"/>
</div><br><br>

Our custom design divides the home page into two components: a feed of user posts, as well as a column which displays user profiles. The interactive feed allows users to like, comment, or reply
to user posts, as well as to create new posts of their own. Images and embedded Youtube videos can be added to user posts.

By default, the right column displays the logged-in user's profile information. Other users' profile information can also be displayed here.

> ## Navbar

<br>

<div align="center">
<img src="src\ui\src\assets\iconSquawk.png" width="400" height="auto" alt="Shows Your Wardrobe features"/>
</div><br><br>

A persistent navigation bar allows users to navigate the website, as well as to search for other users.

<br><br>

## Acknowledgements

- [npm](https://www.npmjs.com/)
- [Img Shields](https://shields.io)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [Figma](https://www.figma.com/)
- Special thanks to our amazing trainer, Kyle!

<!-- Contributor Links -->

[kirill-linkedin]: https://www.linkedin.com/in/kirill-klimov-001/
[kirill-github]: https://github.com/kklimov1
[travism-linkedin]: https://www.linkedin.com/in/travis-morse-7574107a/
[travism-github]: https://github.com/travis503
[audie-linkedin]: https://www.linkedin.com/in/audie-ni-116283126/
[audie-github]: https://github.com/tasukaru
[brayden-linkedin]: https://www.linkedin.com/
[brayden-github]: https://github.com/braydensn
[william-linkedin]: https://www.linkedin.com/in/william-osborne-b62910b0/
[william-github]: https://github.com/WEOzzy
[travisp-linkedin]: https://www.linkedin.com/in/travis-pomeroy-2a949b163/
[travisp-github]: https://github.com/TPomerz
[matthew-linkedin]: https://www.linkedin.com/
[matthew-github]: https://github.com/
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-grey?style=for-the-badge&logo=linkedin
[github-shield]: https://img.shields.io/badge/-GitHub-grey?style=for-the-badge&logo=github
