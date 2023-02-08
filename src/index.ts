import express, { Request, Response } from "express"
import { genData } from "./utils/genData"

const app = express()
const cors = require('cors');

// const corsOption = {
//     origin: ['http://localhost:3000'],
// };

// app.use(cors(corsOption));
// //if you want in every domain then
app.use(cors())
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Database')
})

app.get('/data', (req: Request, res: Response) => {
  res.json(genData(1000))
})

app.get('/data/:id', (req: Request, res: Response) => {
  console.log('--------req', req)
  console.log('--------req.params.id', req.params.id)
  const { id } = req.params
  const findIssue = genData(1000)?.find((item: any) => item.id === parseInt(id))
  console.log('--------findIssue', findIssue)
  if (findIssue) {
    res.json(findIssue)
  } else {
    res.sendStatus(404)
  }
})


app.listen(process.env.PORT || 4000, () => console.log(`server is running on ${process.env.PORT || 4000}`))
