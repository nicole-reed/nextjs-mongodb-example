import { connectToDatabase } from '../util/mongodb'

export default function Movies({ movies }) {
    return (
        <div>
            <h1>Top 20 Movies of All Time</h1>
            <p>
                <small>(According to Metacritic)</small>
            </p>
            <ul>
                {movies.map((movie) => (
                    <li>
                        <h2>{movie.title}</h2>
                        <h3>{movie.metacritic}</h3>
                        <p>{movie.plot}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export async function getServerSideProps() {
    const { db } = await connectToDatabase()

    const movies = await db
        .collection('movies')
        .find({})
        .sort({ metacritic: -1 })
        .limit(20)
        .toArray()

    return {
        props: {
            movies: JSON.parse(JSON.stringify(movies)),
        },
    }
}

// The getServerSideProps() method forces a Next.js page to load with server - side rendering.
//What this means is that every time this page is loaded, the getServerSideProps() method runs 
//on the backend, gets data, and sends it into the React component via props.The code within 
//getServerSideProps() is never sent to the client.This makes it a great place to implement our MongoDB queries.

// As you can see from the example above, we are importing the same connectToDatabase utility class,
// and our MongoDB query is exactly the same within the getServerSideProps() method.The only thing we
// really needed to change in our implementation is how we parse the response.The getServerSideProps()
// return method has some trouble serializing our data.There is a GitHub issue open to address this, 
//but the current workaround is to stringify and then parse the data manually.

// Our page component called Movies gets the props from our getServerSideProps() method,
// and we use that data to render the page showing the top movie title, metacritic rating, and plot.

// the one downside to this is that this method runs every time we call the page.
// Our data is pretty static and unlikely to change all that often.
// What if we pre - rendered this page and didn't have to call MongoDB on every refresh? 