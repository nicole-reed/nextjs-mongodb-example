import { connectToDatabase } from '../../../../util/mongodb'

export default async (req, res) => {
    const { db } = await connectToDatabase()
    const reqTitle = req.query.title
    console.log(reqTitle)

    const movie = await db
        .collection('movies')
        .findOne({ title: reqTitle })

    res.json(movie)
}