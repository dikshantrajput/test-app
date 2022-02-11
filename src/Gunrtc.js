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
    gun.current = Gun('http://test-appsasdas.herokuapp.com/gun')
    setUsers(gun.current.get('teams'))
    gun.current.get('teams').map().once((item,id)=>{
      setLocalUsers((prev)=>[...prev,{id,name:item?.n,points:item?.p}])
    },{wait:0})
  },[])
  
  const clickHandler = ()=>{
    users.set({n:name,p:points})
  }
  
  const incrementPoints = (id)=>{
    gun.current.get('teams').get(id).once((i)=>{
      let points = parseFloat(i.p)
      gun.current.get('teams').get(id).put({p:points+1})
      
      const filter = localUsers.filter((item)=>item.id != id)

      const item = localUsers.find((item)=>item.id == id)
      item.points++
      setLocalUsers([...filter,item])
    })
    
  }
  
  return (
    <div>
      <input value={name} onChange={(e)=>setName(e.target.value)} />
      <input value={points} onChange={(e)=>setPoints(e.target.value)} />
      <button onClick={clickHandler} >Add</button>
      {
        localUsers.sort((a,b)=>a.points - b.points).map((i)=>{
          return <div key={i?.id}>{i?.name} - {i?.points} <button onClick={()=>incrementPoints(i?.id)}>+</button></div>
        })
      }

      {/* <button onClick={handleClick1}>
        Team 1
      </button>
      <button onClick={handleClick2}>
        Team 2
      </button>
      <button onClick={handleClick3}>
        Team 3
      </button> */}
    </div>
  )
}

export default Gunrtc