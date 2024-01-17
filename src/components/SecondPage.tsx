import React, { useEffect, useState } from "react";
import DepartmentTree from "../components/DepartmentTree";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import axios from "axios";
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const SecondPage: React.FC = () => {
  const [userData, setUserData] = useState<Post[]>([]);

  const departmentData = [
    {
      department: "customer_service",
      sub_departments: ["support", "customer_success"],
    },
    {
      department: "design",
      sub_departments: ["graphic_design", "product_design", "web_design"],
    },
  ];

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    console.log(userDetails);

    if (!userDetails) {
      alert("Please enter your details before accessing this page.");
      window.location.href = "/";
    }
  }, []);

  const fetchApi = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const Data = response.data;
      console.log(Data);
      setUserData(Data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchApi();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "body", headerName: "body", width: 600 },
  ];

  return (
    <>
      <h1>Title List:</h1>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={userData} columns={columns} checkboxSelection />
      </div>

      <DepartmentTree data={departmentData} />
    </>
  );
};

export default SecondPage;
