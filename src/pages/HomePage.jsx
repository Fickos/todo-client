import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function HomePage() {

    const [id, setId] = useState('');

    const navigate = useNavigate();

    return (
      <div className="home">
        Enter the user/group name

        <input onChange={(e) => setId(e.target.value)} />
        <button onClick={() => navigate(id)}>Go</button>
      </div>
    )
}