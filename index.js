const express = require('express')
const app = express()
const port = 3000
const read = require('./read')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

/*app.get('/Users', (req, res) => {
  res.send(read.scan())
})*/

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
