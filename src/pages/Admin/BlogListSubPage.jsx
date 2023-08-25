import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { db } from "../../firebase-config";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import LoadingSpinner from "../../components/Admin/LoadingSpinner";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const BlogListSubPage = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getBlogs = async () => {
      const filterdData = query(
        collection(db, "blogs"),
        where("title", "!=", "null")
      );
      const querySnapshot = await getDocs(filterdData);
      setRows(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setIsLoading(false);
    };
    getBlogs();
  }, []);

  const handleDelete = async (row) => {
    confirmAlert({
      message: "Are you sure to delete your blog ?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const blogDoc = doc(db, "blogs", row.id);

            await deleteDoc(blogDoc);

            const storage = getStorage();
            const imageRef = ref(storage, `BlogImages/${row.image}`);
            deleteObject(imageRef);
            window.location.reload(false);
          },
        },
        { label: "No" },
      ],
    });
  };

  const renderPage = (
    <Box
      sx={{
        height: 300,
        mx: "60px",
        my: "30px",
      }}
    >
      <h1>Published Blog Posts</h1>
      <TableContainer
        sx={{
          height: 410,
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-track": {
            background: "white",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#2A3036",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        <Table sx={{ width: "100%", height: "max-content" }}>
          <TableHead sx={{ width: "90%" }}>
            <TableRow>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Author</TableCell>
              <TableCell align="center">Date Published</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.blogID} hover={true}>
                <TableCell
                  scope="row"
                  onClick={() => {
                    navigate("/admin/blog/view", {
                      state: {
                        id: row.id,
                        blogID: row.blogID,
                        title: row.title,
                        content: row.content,
                        image: row.image,
                      },
                    });
                  }}
                  style={{ width: "55%" }}
                >
                  {row.title}
                </TableCell>
                <TableCell
                  style={{ width: "20%" }}
                  sx={{ textTransform: "capitalize" }}
                  align="left"
                >
                  {row.author}
                </TableCell>
                <TableCell style={{ width: "15%" }} align="center">
                  {row.date
                    ? new Date(row.date.seconds * 1000).getDate() +
                      "/" +
                      (new Date(row.date.seconds * 1000).getMonth() + 1) +
                      "/" +
                      new Date(row.date.seconds * 1000).getFullYear()
                    : null}
                </TableCell>
                <TableCell style={{ width: "10%" }} align="center">
                  <DeleteIcon
                    onClick={() => {
                      handleDelete(row);
                    }}
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        sx={{
          mt: "20px",
        }}
        style={{
          backgroundColor: "#3C56F5",
          padding: "5px 36px",
        }}
        onClick={() => {
          navigate("/admin/blog/create");
        }}
      >
        Create New Blog
      </Button>
    </Box>
  );

  return <> {isLoading ? <LoadingSpinner /> : renderPage}</>;
};

export default BlogListSubPage;
