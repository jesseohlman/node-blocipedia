# Blocipedia:
This app was created to provide users with a way to share information in a wiki format. Users can create, collaborate, and share wikis. Members can also upgrade their account for a small fee, allowing them to make their wikis private to only them and their collaborators.


## Stack:
In this project I chose to use EJS for front-end, Node.js, Sequelize, and Express for back-end and Bootstrap for styling. I chose EJS because it allowed me to add simple Javascript logic into my html. Out of all the frameworks/libraries in this stack I have the most experience with Express, node and sequelize. They were no-brainers for me as I have established my work flow heavily around Sequelize models and the Express API. Because my data is uniform in it's properties, I chose the Sequelize ORM over something more vague like Mongoose. I used good old Passport for user authentication because it works well with Express and allows you to send response messages to the user. Finally, I chose Bootstrap for styling because it's quick and easy to implement with a very clean feel.


## Upgrades: 
If this was an app for a company, or I wanted to upgrade it, there are a few changes I would make. First, I would replace EJS with React.js. EJS works well in the websites current state, but most of the features I want to add require DOM to work smoothly. Features such as the ability to upvote/downvote wikis. This would allow for inaccurate wikis to be sorted out from the quality wikis. Next, I would add categorizing features to each wiki, and searching functionalities to help users sort through the wikis. Finally, I would allow users to add images and attach files to their wikis in order to further expand on their information.

## tests:
``` 
npm test
```

