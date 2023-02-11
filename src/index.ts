import express, { Request, Response } from "express"
import { genData } from "./utils/genData"
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import { middleware } from "supertokens-node/framework/express";
import { errorHandler } from "supertokens-node/framework/express";
import Dashboard from "supertokens-node/recipe/dashboard"

/* intializations */
const app = express()
const cors = require('cors');
supertokens.init({
    framework: "express",
    supertokens: {
        // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
        connectionURI: "http://localhost:3567",
        // apiKey: <API_KEY(if configured)>,
    },
    appInfo: {
        // learn more about this on https://supertokens.com/docs/session/appinfo
        appName: "Gardenia Issue Management",
        apiDomain: "http://localhost:4000",
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/auth",
        websiteBasePath: "/auth",
    },
    recipeList: [
        Dashboard.init({apiKey: "liverpool1997"}),
        EmailPassword.init(), // initializes signin / sign up features
        Session.init() // initializes session features
    ]
});

/* middlewares */
app.use(cors({
  origin: 'http://localhost:3000',
  allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
  credentials: true,
}))
app.use(middleware());

/* routes */
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Database')
})

app.get('/data', (req: Request, res: Response) => {
  res.json(genData())
})

app.get('/data/:id', (req: Request, res: Response) => {
  const { id } = req.params
  const findIssue = genData(1000)?.find((item: any) => item.id === parseInt(id))
  if (findIssue) {
    res.json(findIssue)
  } else {
    res.sendStatus(404)
  }
})

// Add this AFTER all your routes
app.use(errorHandler())

app.listen(process.env.PORT || 4000, () => console.log(`server is running on ${process.env.PORT || 4000}`))
