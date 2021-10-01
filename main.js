// @TODO: посмотреть как настроить nodemon
const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = 3000

// @TODO: прочитать почему это устарело
app.use(bodyParser.json())

// @TODO: вынести в отедльынй файл
function isNumeric(str) {
  if (typeof str === "number") return true
  if (typeof str != "string") return false
  return !isNaN(str) &&
    !isNaN(parseFloat(str))
}

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

let postStruct = {
  id: Number,
  name: String,
  floors_count: Number,
  lot_type: Number,
  in_operation_date: String,
  parking_available: Boolean,
  parking_count: Number,
  constructive_type: Number,
  district: String,
  city: String,
}

let posts = [
  {
    id: 1,
    name: 'smth',
    floors_count: 1,
    lot_type: 2,
    in_operation_date: "2019-09-10",
    parking_available: true,
    parking_count: 2,
    constructive_type: 2,
    district: 'dfdf',
    city: 'dvdfv',
  },
  {
    id: 2,
    name: 'smth',
    floors_count: 1,
    lot_type: 2,
    in_operation_date: "2019-09-10",
    parking_available: true,
    parking_count: 2,
    constructive_type: 2,
    district: 'dfdf',
    city: 'dvdfv',
  },
]

app.get('/api/posts', async (req, res) => {
  res.send(posts)
})

app.post('/api/posts', (req, res) => {
  // @TODO: сделать как в patch
  let errorFields = []
  if (req.body.name == null) {
    errorFields.push('name')
  }
  if (req.body.floors_count == null) {
    errorFields.push('floors_count')
  }
  if (req.body.lot_type == null) {
    errorFields.push('lot_type')
  }
  if (req.body.in_operation_date == null) {
    errorFields.push('in_operation_date')
  }
  if (req.body.parking_available == null) {
    errorFields.push('parking_available')
  }
  if (req.body.parking_count == null) {
    errorFields.push('parking_count')
  }
  if (req.body.constructive_type == null) {
    errorFields.push('constructive_type')
  }
  if (req.body.district == null) {
    errorFields.push('district')
  }
  if (req.body.city == null) {
    errorFields.push('city')
  }
  if (errorFields.length !== 0) {
    let resErrMessage = errorFields.reduce((p, c) => p + ", " + c)
    resErrMessage += " field(s) required"
    res.status(400).send(resErrMessage)
    return;
  }

  let errorFiledsTypes = []
  if (typeof req.body.floors_count !== "number") {
    errorFiledsTypes.push('floors_count must be number')
  }
  if (typeof req.body.lot_type !== "number") {
    errorFiledsTypes.push('lot_type must be number')
  }
  if (typeof req.body.parking_count !== "number") {
    errorFiledsTypes.push('parking_count must be number')
  }
  if (typeof req.body.constructive_type !== "number") {
    errorFiledsTypes.push('constructive_type must be number')
  }
  if (req.body.id !== undefined && typeof (req.body.id) !== "number") {
    errorFiledsTypes.push('id must be number')
  }

  if (errorFiledsTypes.length !== 0) {
    let resErrMessage = errorFiledsTypes.reduce((p, c) => `${p}\n${c}`, "")
    res.status(400).send(resErrMessage)
    return;
  }

  if (req.body.id != undefined && posts.reduce((p, c) => p || c.id == req.body.id, false)) {
    res.status(409).send('id already is used')
    return;
  }

  const ALLOWED_ATTRIBUTES = ["id", "name", "floors_count", "lot_type", "in_operation_date", "parking_available", "parking_count", "constructive_type", "district", "city"]

  if (Object.keys(req.body).reduce((p, c) => p || !ALLOWED_ATTRIBUTES.includes(c), false)) {
    res.status(400).send('neponimayu')
    return
  }

  // if(typeof req.body.floors_count === "string"){
  //   req.body.floors_count = parseInt(req.body.floors_count)
  // }
  // if(typeof req.body.lot_type === "string"){
  //   req.body.lot_type = parseInt(req.body.lot_type)
  // }
  // if(typeof req.body.parking_count === "string"){
  //   req.body.parking_count = parseInt(req.body.parking_count)
  // }
  // if(typeof req.body.constructive_type === "string"){
  //   req.body.constructive_type = parseInt(req.body.constructive_type)
  // }
  // if(typeof req.body.id === "string"){
  //   req.body.id = parseInt(req.body.id)
  // }

  let maxId = posts.reduce((p, c) => c.id > p ? c.id : p, 0)
  let newPostId = posts.push(Object.assign({}, { id: maxId + 1 }, req.body))
  res.send(posts[newPostId - 1])
})

app.patch('/api/posts/:id', (req, res) => {
  let postId = parseInt(req.params.id)

  let postKeys = Object.keys(postStruct)
  postKeys = removeItemOnce(postKeys, "id")

  let fFatal = false;
  let fatalMsg = "";
  Object.keys(req.body).forEach((v) => {
    if (postKeys.includes(v)) {
      // @TODO: подумать как сделать это без таких деклараций в одну строку
      // typeof req.body[v] !== postStruct[v]
      // @TODO: инвертировать что бы убрать else и всё было в if
      if (postStruct[v] === String && typeof req.body[v] === "string" ||
        postStruct[v] === Number && typeof req.body[v] === "number" ||
        postStruct[v] === Boolean && typeof req.body[v] === "boolean") { }// <--- пустой блок убрать
      else {
        fatalMsg += `\n${v} field must be ${postStruct[v].name}`
        fFatal = true;
      }
    } else {
        fatalMsg += `\nUnexpected ${v} field`
        fFatal = true;
    }
  })
  if (fFatal) {
    res.status(400).send(fatalMsg)
    return
  }


  if (posts.filter(p => p.id == postId).length == 0) {
    res.status(404).send("post not found");
    return
  }

  posts = posts.map(v => v.id == postId ? Object.assign({}, v, req.body, { id: postId }) : v)

  res.send(posts.filter(p => p.id == postId)[0]);
})

app.delete('/api/posts/:id', (req, res) => {
  if (!isNumeric(req.params.id)) {
    res.status(400).send("postId must be number");
    return
  }

  let postId = parseInt(req.params.id)

  if (posts.filter(p => p.id == postId).length == 0) {
    res.status(404).send("post not found");
    return
  }

  posts = posts.filter(p => p.id != postId)
  res.send({ postId })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
