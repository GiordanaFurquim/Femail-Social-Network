# Femail-Social-Network
The Project Femail is a Social Network built to connect women in order to learn and teach things to each other. The technology used to develop this application includes React.js (with Hooks and Redux), Express/Node.js, Flask/Python, HTML5, CSS 3, AWS S3, SQL/Postgres, Cookie Session/CSRF-Token against CSRF attacks, Jest and Socket.io. The project is still ongoing. 

![chrome-capture (11)](https://user-images.githubusercontent.com/50359290/67096796-28f68880-f1b9-11e9-9fd3-1499ef86f141.gif)

# Description
The Femail project is a Social Network to connect women in order to learn and teach different things to each other. The idea is to create a women's network to help with different issues, including, but not limited to, education. 

This Social Network has a prototype of a recommendation system (Collaborators) that consists of finding the perfect pairs of users to help each other. This feature is being developed with two different servers (Node.js and Flask), listening to different ports, too (8080 and 5000) and still communicating and sharing information about users and their profiles through a single database.

## Recommender System's Dataflow

<img width="815" alt="dataflow" src="https://user-images.githubusercontent.com/50359290/67096070-a28d7700-f1b7-11e9-9683-b35683b14691.PNG">

- User Input
- HTTP Get Request
- Flask (recommender.py)
- Output as a JSON file
- Output gets rendered on Femail

The project is still ongoing and ideas and collaborators are welcome. 

