const express = require('express');
const { enquiryInsert, enquiryList, enquiryDelete, enquirySingleRow, enquiryUpdate } = require('../../controllers/web/enquiryController');
const enquiryRouter = express.Router();

enquiryRouter.post("/insert", enquiryInsert);

enquiryRouter.get("/view", enquiryList);

enquiryRouter.delete("/delete/:id", enquiryDelete);

enquiryRouter.get("/single/:id", enquirySingleRow);

enquiryRouter.put("/update/:id", enquiryUpdate)

module.exports = enquiryRouter;