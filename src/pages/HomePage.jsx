import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function HomePage() {

    const [id, setId] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        sessionStorage.setItem('td-location', JSON.stringify({ lat: position.coords.latitude, lng: position.coords.longitude}));
      });
    }, []);

    return (
      <div className="home">
        <h2>Enter the user/group name</h2>
        <div className="flex-center">
          <input type="text" onChange={(e) => setId(e.target.value)} />
          <button onClick={() => navigate(id)}>Go</button>
        </div>
      </div>
    )
}