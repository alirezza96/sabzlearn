import app from "./app.js"
import "./configs/db.js"
import "dotenv/config"
const port = process.env.SERVER_PORT
app.get('/', (req, res) => {
  res.send('Hello World!')
})











app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})

