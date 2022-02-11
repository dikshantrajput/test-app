import React, {useState,useEffect,useRef} from 'react'
import Gun from 'gun'
require('gun/lib/load.js')

function Gunrtc() {
  const [name,setName] = useState('')
  const [points,setPoints] = useState(0)
  const [users,setUsers] = useState(null)
  const [localUsers,setLocalUsers] = useState([])

  const gun = useRef(null)
  
  useEffect(()=>{
    gun.current = Gun('http://localhost:3001/gun')
    setUsers(gun.current.get('users'))
    gun.current.get('users').get('teams').map().once((item,id)=>{
      setLocalUsers((prev)=>[...prev,{id,name:item?.n,points:item?.p}])
    },{wait:0})
  },[])

  const clickHandler = ()=>{
    users.get('teams').set({n:name,p:points})
  }
  
  return (
    <div>
      <input value={name} onChange={(e)=>setName(e.target.value)} />
      <input value={points} onChange={(e)=>setPoints(e.target.value)} />
      <button onClick={clickHandler} >Add</button>
      {
        localUsers.sort((a,b)=>a.points - b.points).map((i)=>{
          return <div key={i?.id}>{i?.name} - {i?.points} </div>
        })
      }
    </div>
  )
}

export default Gunrtc