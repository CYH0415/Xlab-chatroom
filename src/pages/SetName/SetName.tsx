import './SetName.css'
import { useNavigate } from 'react-router-dom'

export default function SetName () {
    let navigate = useNavigate();
    function jump () {
        const name = document.querySelector('input')?.value;
        if (name === '') {
            alert("Please enter a name to continue.");
            return;
        }
        navigate("/index", { state: { name: name } })
    }
    
    return (
        <div className="set-name">
                <h1>Welcome to Chatroom!</h1>
                <div>
                    <input type="text" placeholder="Enter your name" />
                    <button onClick={jump}>Start</button>    
                </div>
        </div>
    )
}