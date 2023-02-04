import express, { Request, Response } from "express"
import { faker } from '@faker-js/faker'
import { type } from "os"
const app = express()

const genData = (rows: number) => {
  return Array.from(Array(rows), (item, index) => {
    return {
      id: index + 1,
      issueId: faker.random.alphaNumeric,
      name: faker.company.name(),
      dateRegistered: faker.date.recent(),
      ownerName: faker.name.fullName(),
      address: faker.address.cityName(),
      phoneNumber: faker.phone.number()
    }
  }
  )
}

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


app.listen(process.env.PORT || 3000, () => console.log(`server is running on ${process.env.PORT || 3000}`))
