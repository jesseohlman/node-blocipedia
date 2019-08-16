# Grocery List Manager:
This app was created to provide users with a way to quickly create and use grocery lists. Users are able to create new lists, add items to each list and perform crud operations on lists and items. Both lists and items can be marked or unmarked completed.



## Problem/Solution:
The problem - A group of people want to go to the store, split up, and still have access to a list of items they have created. When one person makes a change to the list, every person in the group wants to see the change.

The solution - An application that allows users to sign into the same account from multiple devices. When a change is made in the app, the server will send the new information to each users device. Users can create lists, items, and mark them as complete.



## Stack:
In this project I chose to use React.js for front-end, Node.js, Sequelize and Express for back-end and Bootstrap for styling. I chose React as my front-end library because it's fast, updates in real time(Virtual DOM), and speeds up development by handling DOM for me! Although I have used react in a few apps in the past, it's been months since I have touched it, I had a bit of a learning curve at the beggining. Out of all the frameworks/libraries in this stack I have the most experience with Express, node and sequelize. They were no-brainers for me as I have established my work flow heavily around Sequelize models and the Express API. Because my data is uniform in it's properties, I chose the Sequelize ORM over something more vague like Mongoose. I used good old Passport for user authentication because it works well with Express and allows you to send response messages to the user. Finally, I chose Bootstrap for styling because it's quick and easy to implement with a very clean feel. I've always struggled getting css to work with me, so I relied mostly on Bootstrap for my styling. I went with a simple lean build that allows better accessibility to users on phones, which is where this app would mmostly be used.



## Technical Choices: 
This app is configured to run a client server and the back-end server concurrently. This was my biggest struggle: getting my backend to work with react without being able to render my views with my Express. However, after getting a hang of axios, it was very satisfying seeing my pages update in real time without unnecessary reloads on every post request. I use React's class components to manage DOM with state and props. The functions in the component make requests to the server through Express. Express handles the requests, using sequelize to edit the database, and responds with json objects which the comoponents use to render and update data. 



## Upgrades: 
Given more time to work on this project, there are a few improvements I would make. First of all, I would allow different users to interact with eachother, allowing them to share lists with their friends and family. I think it would be awesome if I could add a optional location tracker on each connected user, therefore, if you were in the store with your friends or family, you could see where they are in the store. I would also add an option to set the current item(s) that each person is looking for so that two people don't find themselves in the same isle looking for the same thing. Speaking more technically, I would add more tests for my react comonents, making updates easier. Speaking of updates, I struggled for a long time getting item and list updates to work correctly. In the current state, they both work correctly, however, there are better ways of doing it. Finally, I would use a socket system to update users devices when another user makes a change. Right now I am using a timer to update each device, which would cause performance issues with large amounts of data.

## tests:
``` 
npm test
```
