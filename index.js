import server from "./server.js"
import { connectDB } from "./src/services/database.js"

let { PORT } = process.env

const serverStart = async () => {
    try {
        // Open MongoDB Connection

        await connectDB()

        server.listen(PORT, ()=> {
            console.log(`Server is running on port ${PORT}`)
        })

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

serverStart()