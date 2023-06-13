// import { useState } from "react"
// import {Row, Col, Space,  Input, Avatar, Upload, Button} from 'antd'
// import { useState, useEffect} from 'react'
// import {useNavigate} from 'react-router-dom'
// import axios from 'axios'
import { CreateAlbum } from "../components/CreateAlbum"

export function AddAlbumPage() {
    return(
        <CreateAlbum/>

        )
    
    }
    // const [name, setName] = useState("")
    // const [genre, setGenre] = useState("")
    // const [artist, setArtist] = useState("")
    // const [img, setImg] = useState()
    // const [selectedFile, setSelectedFile] = useState()
    // const [preview, setPreview] = useState()
    // const [dataSource, setDataSource] = useState([
    //     {
    //         key: '0',
    //         name: 'Track name',
    //         artist: 'Artist name',
    //     }
    // ]);

    // let navigate = useNavigate();

    // useEffect(() => {
    //     if (!selectedFile) {
    //         setPreview(undefined)
    //         return
    //     }

    //     const objectUrl = URL.createObjectURL(selectedFile)
    //     setPreview(objectUrl)

    //     return () => URL.revokeObjectURL(objectUrl)
    // }, [selectedFile])

    // const onSelectFile = e => {
    //     if (!e.file || e.file.length === 0) {
    //         setSelectedFile(undefined)
    //         return
    //     }

    //     setSelectedFile(e.file)
    //     setImg(e.file)
    // }

    
    //     <Space direction="vertical" style={{textAlign:"center"}}>
    //         <h2>Add Album</h2>
    //         <Input placeholder="Enter album name" onChange={(e) => { setName(e.target.value) }}/>
    //         <Input placeholder="Enter artist" onChange={(e) => { setArtist(e.target.value) }}/>
    //         <Input placeholder="Enter genre" onChange={(e) => { setGenre(e.target.value) }}/>
    //         <Upload 
    //             onChange={onSelectFile}
    //             beforeUpload={() => {
    //                 return false;
    //             }}
    //             maxCount={1}
    //             accept="image/png, image/jpeg"
    //         >
    //             <Button style={{width: '100%'}} >Click to Upload</Button>
    //         </Upload>
    //         {selectedFile &&  <img src={preview} style={{width:"20%"}}/> }
    //         <Button type="primary" shape="round" size={'large'} onClick={postArtist} style={{width: '100%'}}>
    //         Create Artist
    //         </Button>
    //         </Space>
