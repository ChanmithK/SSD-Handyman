import React, { useState, useEffect, useRef } from "react";
import ReactToPrint from "react-to-print";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";

const theadStyle = {
  fontFamily: "poppins",
  fontWeight: "bold",
  fontStyle: "normal",
};

const thStyle = {
  paddingLeft: "50px",
  paddingTop: "30px",
};

const heading = {
  left: "auto",
  paddingTop: "40px",
  paddingLeft: "50px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: "500",
  fontSize: "37px",
  textAlign: "left",
  color: "#125465",
};

const trStyle = {
  fontFamily: "poppins",
  fontWeight: "normal",
  fontStyle: "normal",
};

const tdStyle = {
  paddingLeft: "50px",
  paddingTop: "10px",
};

const button = {
  left: "100px",
  width: "160px",
  padding: "8px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: "500",
  fontSize: "17px",
  textAlign: "center",
  color: "white",
  backgroundColor: "#054fc7",
  border: "none",
  borderRadius: "12px",
};

const body = {
  backgroundColor: "white",
  width: "100vw",
  height: "100vh",
  paddingLeft: "40px",
  paddingTop: "40px",
};

const Trainer = (props) => {
  return (
    <tr key={props.inv.id} style={trStyle}>
      <td style={tdStyle}>{props.inv.name}</td>
      <td style={tdStyle}> {props.inv.mobile}</td>
      <td style={tdStyle}> {props.inv.email}</td>
      <td style={tdStyle}> {props.inv.rate}</td>
    </tr>
  );
};

const Example = React.forwardRef((props, ref) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      const filterdData = query(
        collection(db, "users"),
        where("role", "==", "Trainer")
      );
      const querySnapshot = await getDocs(filterdData);
      let usersList = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setRows(usersList);
    };

    getBlogs();
  }, []);

  const trainersList = () => {
    return rows.map(function (currentTrainer, i) {
      return <Trainer inv={currentTrainer} key={i} />;
    });
  };

  return (
    <div ref={ref}>
      <p style={heading}>Trainer Report - FitFlame</p>
      <table>
        <thead style={theadStyle}>
          <th style={thStyle}>Trainer Name</th>
          <th style={thStyle}>Mobile</th>
          <th style={thStyle}>Email</th>
          <th style={thStyle}>Rating</th>
        </thead>
        <tbody>{trainersList()}</tbody>
      </table>
    </div>
  );
});

const Report = () => {
  const componentRef = useRef();

  return (
    <div style={body}>
      <ReactToPrint
        trigger={() => <button style={button}>Print</button>}
        content={() => componentRef.current}
      />
      <Example ref={componentRef} />
    </div>
  );
};

export default Report;
