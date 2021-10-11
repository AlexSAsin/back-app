const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.port || 3000
const registerRouter = require('./routers/posts')
require('./db')
app.use(cors())

registerRouter(app)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
