import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   message: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newMessage = { ...form };
 
   await fetch("http://localhost:5000/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newMessage),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ message: "", description: "" });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="message">Message</label>
         <input
           type="text"
           className="form-control"
           id="message"
           value={form.message}
           onChange={(e) => updateForm({ message: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="message">Description</label>
         <input
           type="text"
           className="form-control"
           id="description"
           value={form.description}
           onChange={(e) => updateForm({ description: e.target.value })}
         />
       </div>
       
       <br/>
       <div className="form-group">
         <input
           type="submit"
           value="Create message"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}