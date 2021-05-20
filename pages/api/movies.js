import { connectToDatabase } from '../../util/mongodb'

export default async (req, res) => {
    const { db } = await connectToDatabase()

    const movies = await db
        .collection('movies')
        .find({})
        .sort({ metacritic: -1 })
        .limit(20)
        .toArray()

    res.json(movies)
}

// To explain what is going on here we'll start with the import statement. 
//We are importing our connectToDatabase method from the util/mongodb file. 
//This file contains all the instructions on how to connect to our MongoDB Atlas cluster. 
//Additionally, within this file we cache the instance of our connection so that subsequent
// requests do not have to reconnect to the cluster. They can use the existing connection. 
//All of this is handled for you!

// Next our API route handler has the signature of export default async(req, res).
//If you're familiar with Express.js, this should look very familiar. This is the function 
//that gets executed when the localhost:3000/api/movies route is called. We capture the request
// via req and return the response via the res object.

// Our handler function implementation calls the connectToDatabase() function to get the instance of 
//our MongoDB database.Next, we execute a MongoDB query using the MongoDB Node.js Driver to get the 
//top twenty movies out of our movies collection based on their metacritic rating sorted in descending order.

//     Finally, we call the res.json method and pass in our array of movies.This serves our 
//movies in JSON format to our browser.If we navigate to localhost: 3000 / api / movies, 
//we'll see a result that looks like this: