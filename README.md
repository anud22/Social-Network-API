 # Social Network API
 <br>
 MongoDB is a popular choice for many social networks due to its speed with large amounts of data and flexibility with unstructured data.This project builds an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. The project uses Express.js for routing, a MongoDB database, and the Mongoose ODM.

 ## Table Of Contents
- [Description](#description)
- [Installation](#installation)
- [Video](#video)
- [References](#references)
<br>
<br>

 ## Description
 As a social media startup, we have developed following APIs to build social network that uses a NoSQL database so that website can handle large amounts of unstructured data -
 ### /api/users - 
              GET all users <br>
              GET a single user by its _id and populated thought and friend data <br>
              POST a new user <br>
              PUT to update a user by its _id <br>
              DELETE to remove user by its _id <br>

 ### /api/users/:userId/friends/:friendId - 
              POST to add a new friend to a user's friend list <br>
              DELETE to remove a friend from a user's friend list <br>

### /api/thoughts -
              GET to get all thoughts <br>
              GET to get a single thought by its _id <br>
              POST to create a new thought
              PUT to update a thought by its _id <br>
              DELETE to remove a thought by its _id <br>

### /api/thoughts/:thoughtId/reactions
              POST to create a reaction stored in a single thought's reactions array field <br>
              DELETE to pull and remove a reaction by the reaction's reactionId value <br>

## Installation
To run project locally follow these steps - 
1. Run npm i to install the required packages
2. Run npm start to start express server and call APIs


## Github Link
Github link to access the project is [Github URL](https://github.com/anud22/Social-Network-API)


## Video
[Project video](https://drive.google.com/file/d/1PrULq2Xb9SSP34B20jpxE6O_93qJUZbG/view)
 
 ## Questions
 #### If you have any questions or need further clarification, feel free to reach out. We are here to help! You can ask questions by creating an issue in this repository or by reaching out to me 
Github profile (https://github.com/anud22)