const enquiryModel = require("../../models/enquiry.model");

const enquiryInsert = (req, res) => {
    let { name, email, phone, message } = req.body;

    let enquiry = new enquiryModel({
        name, email, phone, message
    });
    enquiry.save()
        .then(() => {
            res.send({ status: 1, message: "Enquiry Saved Successfully", enquiryId: enquiry._id });
        }).catch((err) => {
            res.send({ status: 0, message: "Error Occured while Inserting Data : ", error: err });
        })
}


const enquiryList = async (req, res) => {
    const enquiry = await enquiryModel.find();
    res.send({ status: 1, enquiryList: enquiry });
}

const enquiryDelete = async (req, res) => {
    let enId = req.params.id; //frontend : delid from EnquiryList.jsx
    let enquiry = await enquiryModel.deleteOne({ _id: enId });
    res.send({ status: 1, message: "Enquiry Deleted", enquiry });
}

const enquirySingleRow = async (req, res) => {
    let enId = req.params.id;
    let enquiry = await enquiryModel.findOne({ _id: enId });
    console.log("done");
    res.send({ status: 1, enquiry });
}

const enquiryUpdate = async (req, res) => {
    let enquiryId = req.params.id;
    let { name, email, phone, message } = req.body;

    const updateObj = {
        name, email, phone, message
    }
    let updateRes = await enquiryModel.updateOne({ _id: enquiryId }, updateObj);

    res.send({ status: 1, message: "Enquiry Update Successfully", updateRes });
}

module.exports = { enquiryInsert, enquiryList, enquiryDelete, enquirySingleRow, enquiryUpdate };