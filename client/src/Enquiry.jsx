// import React from "react";
import { Label, Textarea, TextInput, Button } from "flowbite-react";
import { EnquiryList } from "./enquiry/EnquiryList";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Enquiry() {
  let [enquiryList, setEnquiryList] = useState([]);

  let [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    id: "",
  });

  let saveEnquiry = (e) => {
    e.preventDefault();

    // let formData = {
    //   name: e.target.name.value,
    //   email: e.target.email.value,
    //   phone: e.target.phone.value,
    //   message: e.target.message.value,
    // };
    if (formData._id) {
      //UPDATE
      axios
        .put(
          `http://localhost:8020/api/website/enquiry/update/${formData._id}`,
          formData
        )
        .then((res) => {
          toast.success("Enquiry Updated Successfully");
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
            id: "",
          });
          getAllEnquiry();
        });
    } else {
      //INSERT
      axios
        .post("http://localhost:8020/api/website/enquiry/insert", formData)
        .then((res) => {
          console.log(res.data);

          toast.success("Enquiry Saved successfully"); //https://www.npmjs.com/package/react-toastify
          getAllEnquiry();
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
            _id: "",
          });
        });
    }
  };

  const getAllEnquiry = () => {
    axios
      .get("http://localhost:8020/api/website/enquiry/view")
      .then((res) => {
        return res.data;
      })
      .then((finalData) => {
        if (finalData.status) {
          setEnquiryList(finalData.enquiryList);
        }
      });
  };

  const getValue = (e) => {
    let inputName = e.target.name; //name = email,phone,message,name
    let inputValue = e.target.value; //inputFieldsValues = email,phone,message,name

    let oldData = { ...formData }; //shallow copy of formData

    oldData[inputName] = inputValue;
    setFormData(oldData);
  };

  console.log(enquiryList);
  useEffect(() => {
    getAllEnquiry();
  }, []);

  return (
    <div>
      <ToastContainer /> {/*added for toast  */}
      <h1 className="font-bold text-[40px] text-center py-6">User Enquiry</h1>
      <div className="grid grid-cols-[35%_auto]">
        <div className="bg-gray-200 p-4">
          <h2 className="text-[20px] font-bold">Enquiry Form</h2>
          <form action="" onSubmit={saveEnquiry}>
            <div className="py-3">
              <Label htmlFor="name">Your Name</Label>
              <TextInput
                id="name"
                type="text"
                value={formData.name}
                onChange={getValue}
                name="name"
                placeholder="Enter Your Name"
                required
              />
            </div>
            <div className="py-3">
              <Label htmlFor="email" value="Your Email">
                Your Email
              </Label>
              <TextInput
                id="email"
                type="email"
                value={formData.email}
                onChange={getValue}
                name="email"
                placeholder="Enter Your Email"
                required
              />
            </div>
            <div className="py-3">
              <Label htmlFor="phone" value="Your Phone">
                Your Phone
              </Label>
              <TextInput
                id="phone"
                type="text"
                value={formData.phone}
                onChange={getValue}
                name="phone"
                placeholder="Enter Your phone"
                required
              />
            </div>
            <div className="py-3">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={getValue}
                rows="4"
                placeholder="Leave a comment..."
              ></Textarea>
            </div>
            <div className="py-3">
              <Button type="submit" name="submit" className="w-[100%]">
                {formData._id ? "Update" : "Save"}
              </Button>
            </div>
          </form>
        </div>
        <EnquiryList
          data={enquiryList}
          getAllEnquiry={getAllEnquiry}
          setFormData={setFormData}
        />
        {/*as a props,, call EnquiryList , using data key send 'enquirylist[{}]' array data to children EnquiryList.js*/}
      </div>
    </div>
  );
}
