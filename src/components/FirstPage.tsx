import { useState } from "react";
import { useNavigate } from 'react-router-dom';


const FirstPage: React.FC = () => {
    const navigate = useNavigate();

    
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
  
   
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
  
      
      if (name && phone && email) {
        // Save user details to local storage
        localStorage.setItem('userDetails', JSON.stringify({ name, phone, email }));
  
        // Redirect to the second page
        navigate('/second-page');
      } else {
        // Display an error message if any field is empty
        alert('Please fill in all fields');
      }
    };
  
  return (
    <>
     <div>
      <h2>First Page</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Phone Number:
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
    </>
  )
}

export default FirstPage