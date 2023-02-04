"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const faker_1 = require("@faker-js/faker");
const app = (0, express_1.default)();
const genData = (rows) => {
    return Array.from(Array(rows), (item, index) => {
        return {
            id: index + 1,
            issueId: faker_1.faker.random.alphaNumeric,
            name: faker_1.faker.company.name(),
            dateRegistered: faker_1.faker.date.recent(),
            ownerName: faker_1.faker.name.fullName(),
            address: faker_1.faker.address.cityName(),
            phoneNumber: faker_1.faker.phone.number()
        };
    });
};
app.get('/', (req, res) => {
    res.send('Welcome to Database');
});
app.get('/data', (req, res) => {
    res.json(genData(1000));
});
app.get('/data/:id', (req, res) => {
    var _a;
    console.log('--------req', req);
    console.log('--------req.params.id', req.params.id);
    const { id } = req.params;
    const findIssue = (_a = genData(1000)) === null || _a === void 0 ? void 0 : _a.find((item) => item.id === parseInt(id));
    console.log('--------findIssue', findIssue);
    if (findIssue) {
        res.json(findIssue);
    }
    else {
        res.sendStatus(404);
    }
});
app.listen(process.env.PORT || 3000, () => console.log(`server is running on ${process.env.PORT || 3000}`));
