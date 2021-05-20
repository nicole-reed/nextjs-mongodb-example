import { ObjectID } from 'mongodb'
import { connectToDatabase } from '../../../../util/mongodb'


export default async (req, res) => {
    const { db } = await connectToDatabase()
    const { id } = req.query
    console.log()

    const movie = await db
        .collection('movies')
        .findOne({ _id: ObjectID(id) })

    res.json(movie)
}