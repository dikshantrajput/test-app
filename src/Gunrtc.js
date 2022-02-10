import React, {useState,useEffect,useRef} from 'react'
import Gun from 'gun'

function Gunrtc() {
  const [name,setName] = useState('')
  const [users,setUsers] = useState(null)
  const [localUsers,setLocalUsers] = useState([])

  const gun = useRef(null)
  
  useEffect(()=>{
    gun.current = Gun()
    setUsers(gun.current.get('users'))
    gun.current.get('users').map().once((item,id)=>{
      setLocalUsers((prev) => [...prev,{name : item?.n, id : id}])
    })
  },[])

  const clickHandler = ()=>{
    users.set({n:name})
  }

  return (
    <div>
      <input value={name} onChange={(e)=>setName(e.target.value)} />
      <button onClick={clickHandler} >Add</button>
      {
        localUsers.map((i)=>{
          return <div key={i?.id}>{i?.name}</div>
        })
      }
    </div>
  )
}

export default Gunrtc