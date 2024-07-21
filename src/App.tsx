import ChatRoom from './pages/ChatRoom/ChatRoom'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import SetName from './pages/SetName/SetName'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SetName />} />
      <Route path="/index" element={<ChatRoom />} />
    </Routes>
  );
}
