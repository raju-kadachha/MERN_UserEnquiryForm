import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import Notiflix from "notiflix";
import { toast } from "react-toastify";

export function EnquiryList({ data, getAllEnquiry, setFormData }) {
  let deleteRow = (delid) => {
    Notiflix.Confirm.init({
      width: "500px",
      fontSize: "20px", // larger text = more height
      borderRadius: "10px",
      titleColor: "#e74c3c",
      messageColor: "#2c3e50",
      okButtonBackground: "#e74c3c",
      cancelButtonBackground: "#95a5a6",
      buttonFontSize: "18px",
    });
    Notiflix.Confirm.show(
      "Confirm Delete",
      "Are you sure you want to delete this enquiry?",
      "Yes",
      "No",
      function okCb() {
        axios
          .delete(`http://localhost:8020/api/website/enquiry/delete/${delid}`)
          .then(() => {
            toast.success(`Enquiry Deleted`);
            getAllEnquiry();
          });
      }
    );
  };
  const editRow = (editid) => {
    axios
      .get(`http://localhost:8020/api/website/enquiry/single/${editid}`)
      .then((res) => {
        let data = res.data;
        setFormData(data.enquiry);
      });
  };

  return (
    <div className="bg-gray-200 p-4 ml-4">
      <h2 className="text-[20px] font-bold ">Enquiry List</h2>

      <div className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Sr No</TableHeadCell>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Phone</TableHeadCell>
              <TableHeadCell>Message</TableHeadCell>
              <TableHeadCell>Edit</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {data.length >= 1 ? (
              data.map((item, index) => {
                return (
                  <TableRow
                    key={index}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {index + 1}
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>
                      {" "}
                      {item.message.length > 8
                        ? item.message.substring(0, 6) + "..."
                        : item.message}
                    </TableCell>
                    <TableCell>
                      <a
                        onClick={() => editRow(item._id)}
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Edit
                      </a>
                    </TableCell>
                    <TableCell>
                      <a
                        onClick={() => deleteRow(item._id)}
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Delete
                      </a>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow className="bg-amber-50 dark:border-gray-700 dark:bg-gray-800">
                <TableCell colSpan={7} className="text-center">
                  No Data Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
