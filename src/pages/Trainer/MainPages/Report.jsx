import React, { useState, useEffect, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';

const theadStyle = {
  fontFamily: 'poppins',
  fontWeight: 'bold',
  fontStyle: 'normal',
};

const thStyle = {
  paddingTop: '30px',
};

const heading = {
  left: 'auto',
  paddingTop: '40px',
  paddingLeft: '50px',
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '37px',
  textAlign: 'left',
  color: '#125465',
};

const trStyle = {
  fontFamily: 'poppins',
  fontWeight: 'normal',
  fontStyle: 'normal',
};

const tdStyle = {
  paddingLeft: '50px',
  paddingRight: '50px',
  paddingTop: '10px',
};

const button = {
  left: '100px',
  width: '160px',
  padding: '8px',
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '17px',
  textAlign: 'center',
  color: 'white',
  backgroundColor: '#054fc7',
  border: 'none',
  borderRadius: '12px',
};

const body = {
  backgroundColor: 'white',
  width: '100vw',
  height: '100vh',
  paddingLeft: '40px',
  paddingTop: '40px',
};

const Trainer = (props) => {
  return (
    <tr key={props.inv.id} style={trStyle}>
      <td style={tdStyle}>{props.inv.name}</td>
      <td style={tdStyle}> {props.inv.email}</td>
      <td style={tdStyle}> {props.inv.phone}</td>
      <td style={tdStyle}> {props.inv.programme}</td>
      <td style={tdStyle}> {props.inv.price}</td>
    </tr>
  );
};

const Example = React.forwardRef((props, ref) => {
  const [rows, setRows] = useState([]);
  const [clients, setClients] = useState([]);
  const clientRef = collection(db, 'clients');
  const q = query(clientRef, where('trainerId', '==', '5qO5w7dwRvzo3YeCoppe'));

  useEffect(() => {
    const getClients = async () => {
      const data = await getDocs(q);
      setClients(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };

    getClients();
  }, []);

  const clientList = () => {
    return clients.map(function (currentTrainer, i) {
      return <Trainer inv={currentTrainer} key={i} />;
    });
  };

  return (
    <div ref={ref}>
      <p style={heading}>Clients Report - FitFlame</p>
      <table style={{ maxWidth: '90%' }}>
        <thead style={theadStyle}>
          <th style={thStyle}>Client Name</th>
          <th style={thStyle}>Email</th>
          <th style={thStyle}>Mobile</th>
          <th style={thStyle}>Package</th>
          <th style={thStyle}>Price</th>
        </thead>
        <tbody>{clientList()}</tbody>
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
