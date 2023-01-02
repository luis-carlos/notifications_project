import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Read() {
    const [form, setForm] = useState({
        message: "",
        description: "",
        records: [],
    });

    const params = useParams;
    const navigate = useNavigate;

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const record = await response.json();
            if (!record) {
                window.alert(`Record with id ${id} not found`);
                navigate("/");
                return;
            }
            
            setForm(record);
        }

        fetchData();

        return;
    }, [params.id, navigate]);

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value};
        });
    }
    
    async function onSubmit(e) {
        e.preventDefault();
        const editedMessage = {
            read: true,
        };

        // This will mark the message as read
        await fetch(`http://localhost:5000/update/${params.id}`, {
            method: "POST",
            body: JSON.stringify(editedMessage),
            heafer: {
                'Content-Type': 'application/json'
            },
        });

        navigate("/");
    }

    
    return (
        <div>
     <h3>Read notification</h3>
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
           value="Notifications list"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
    );
}