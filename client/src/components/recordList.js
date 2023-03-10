import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const Record = (props) => (
 <tr>
   {/* <td style={{fontWeight: props.record.read ? 'normal' : 'bold'}}>{props.record.message}</td> */}
   <td>
    <Link style={{fontWeight: props.record.read ? 'normal' : 'bold'}} className="btn btn-link" to={`/read/${props.record._id}`}>{props.record.message}</Link> 
   </td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteRecord(props.record._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
export default function RecordList() {
 const [records, setRecords] = useState([]);
 const [totalMessages, setTotalMessages] = useState(0);
 const [totalMessagesRead, setTotalMessagesRead] = useState(0);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
    const response = await fetch(`http://localhost:5000/record/`);
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
     setRecords(records);
     const read = await fetch(`http://localhost:5000/read/`);
     const totalMessagesRead = await read.json();
     setTotalMessagesRead(totalMessagesRead);
     const total = await fetch('http://localhost:5000/total');
     const totalMessages = await total.json();
     setTotalMessages(totalMessages);
   }
 
   getRecords();
 
   return;
 }, [records.length]);
 
 // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`http://localhost:5000/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
 
 // This method will map out the records on the table
 function recordList() {
   return records.map((record) => {
     return (
       <Record
         record={record}
         deleteRecord={() => deleteRecord(record._id)}
         key={record._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>Notifications List ({totalMessagesRead} unread out of {totalMessages} total)</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Message</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </div>
 );
}