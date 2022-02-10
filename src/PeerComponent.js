import Peer from 'peerjs';
import React , { useState, useEffect, useRef } from 'react';
import Automerge from 'automerge'

function PeerComponent() {

    const [conns,setConns] = useState()

    const [peerDetail, setPeerDetail] = useState({})
    const [doc, setDoc] = useState()
    const inputRef = useRef(null)
    const teamRef = useRef(null)
    
    useEffect(()=>{
        
        const d = Automerge.init() 
        setDoc(d)

        const id = Math.floor(Math.random()*100)
        const peer = new Peer(id)
        console.log(peer._id);

        peer.on('connection', (conn) => {
            conn.on('data', (data) => {
                console.log(d);
                const a = new Uint8Array(data?.evenBinary)
                console.log(a);
                const [newDoc, patch] = Automerge.applyChanges(d, [a])

                console.log(newDoc);
            });
          });

        setPeerDetail(peer)
    },[])
    
    const connectionHandler = ()=>{
        const conn = peerDetail.connect(inputRef.current.value)
        setConns(conn)
        // conn.on('open', () => {
        //     conn.send('hi!');
        // });   
    }

    const registerTeamHandler = ()=>{
        const newDoc = Automerge.change(doc,'adding team',(d) => {
            d.teams.push({ name : teamRef.current.value , points : 11 })
        })
        let changes = Automerge.getChanges(doc, newDoc)
        console.log(changes);
        conns.send({
            evenBinary: new Blob(changes)
        })
        console.log(newDoc);
    }

  return <div>
      <input type="text" ref={inputRef} />
      <button onClick={connectionHandler}>Connect</button>

      <input type="text" ref={teamRef} />
      <button onClick={registerTeamHandler}>Register Team</button>
  </div>;
}

export default PeerComponent;
