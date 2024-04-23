import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { Button, Col, Row } from 'antd';
import baseURL from '../../../../baseURL';
import "./About.css"
import Swal from 'sweetalert2';




const About = () => {
  const [data, setData] = useState()
  const editor = useRef(null)
  const [content, setContent] = useState('');
  console.log(content)
  const [refreash, setRefreash] = useState('')

  if(refreash){
    setTimeout(()=>{
      setRefreash("")
    },[1500])
  }


  const aboutDataSave =async () => {
    await baseURL.patch(`/about/update-about/${data._id}`, {description: content}, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
      }
    }).then((response)=>{
      console.log(response)
      if(response.status === 200){
        Swal.fire({
          position: "center",
          icon: "success",
          width: 550,
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })

  }
  useEffect(()=>{
    setContent(data?.description);
  }, [data])

  useEffect(()=>{
    async function getApi(){
      await baseURL.get("/about/get-about", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        }
      }).then((response)=>{
        if(response.status === 200){
          setData(response.data.data)
        }
      })
    }
    getApi();
  }, [refreash !== ""]);


  
  return (
    <div >
      <JoditEditor
        ref={editor}
        value={content}
          onChange={newContent => { setContent(newContent) }}
      />
      <Button onClick={aboutDataSave} block style={{ marginTop: "30px", backgroundColor: "#6C57EC", border:"none", color: "#fff", height: "50px" }}>save</Button>
    </div>
  );
};

export default About;
