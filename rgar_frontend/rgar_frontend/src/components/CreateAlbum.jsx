import { Button, Form, Input, Popconfirm, Table, Upload, Space } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import '../assets/AlbumCreate.css'
import axios from 'axios'

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};
const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);
    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };
    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({
                ...record,
                ...values,
            });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };
    let childNode = children;
    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }
    return <td {...restProps}>{childNode}</td>;
};

export function CreateAlbum(){

    async function PostAlbum(album, dataSource, e){
        console.log('try', JSON.stringify({ album, dataSource }))
        e.preventDefault();
        try {
            console.log('intry', JSON.stringify({ album, dataSource }))
            
            const response = await axios.post("http://localhost:8000/api/admin/createAlbum/",
                { name: album?.name, genre: album?.genre, artist: album?.artist, cover: album?.cover , tracks: dataSource },
                {
                    headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
                    
                }
            );
            console.log(JSON.stringify(response.data));
            navigate("/settings");
        } catch (error) {
            console.log(error);
            if(error?.response?.status === 401){
                localStorage.clear();
                navigate("/login");
            }
        }
    }

    const [dataSource, setDataSource] = useState([
        {
            key: '0',
            name: 'Track name',
            artist: 'Artist name',
        }
    ]);

    const [count, setCount] = useState(1);
    const [album, setAlbum] = useState({
        name: '',
        artist: '',
        genre: '',
        img: undefined
    })
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };

    const defaultColumns = [
        {
            title: 'name',
            dataIndex: 'name',
            width: '25%',
            editable: true,
        },
        {
            title: 'artist',
            dataIndex: 'artist',
            width: '25%',
            editable: true,
        },
        {
            title: 'file',
            dataIndex: 'file',
            width: '10%',
            render: (_, record, index) => {
                return (
                    <Upload onChange={(e) => {
                        record.file = e.file
                    }
                    }

                        beforeUpload={() => {
                            return false;
                        }}
                        maxCount={1}
                        accept="audio/mp3"
                    >
                        <Button>Upload audio file</Button>
                    </Upload>
                )
            }
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" cancelText="No" okText="Yes" onConfirm={() => handleDelete(record.key)}>
                        <a>Delete</a>
                    </Popconfirm>
                ) : null,
        },
    ];

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.file || e.file.length === 0) {
            setSelectedFile(undefined)
            return
        }

        setSelectedFile(e.file)
        setAlbum({ ...album, cover: e.file })
        console.log('album ', album)
    }

    const handleAdd = () => {
        const newData = {
            key: count,
            name: 'Track name',
            artist: 'Artist name'
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };
    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
    };
    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });
    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <Input placeholder="Album name" size="large"
                onChange={(e) => {
                    setAlbum({ ...album, name: e.target.value });
                    console.log('album ', album)
                }
                } />
                <Input placeholder="Artist" size="large"
                onChange={(e) => {
                    setAlbum({ ...album, artist: e.target.value });
                    console.log('album ', album)
                }
                } />
                <Input placeholder="Genre" size="large"
                onChange={(e) => {
                    setAlbum({ ...album, genre: e.target.value });
                    console.log('album ', album)
                }
                } />
            <Upload 
                onChange={onSelectFile}
                beforeUpload={() => {
                    return false;
                }}
                maxCount={1}
                accept="image/png, image/jpeg"
            >
                <Button>Click to Upload</Button>
            </Upload>
            {selectedFile &&  <img src={preview} style={{width:"20%"}}/> }
            <Button
                onClick={handleAdd}
                type="primary"
                style={{
                    marginBottom: 16,
                }}
            >
                Add track
            </Button>
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
                pagination={false}
            />
            <Button
                onClick={e => PostAlbum(album, dataSource, e)}
                type="primary"
                style={{
                    marginBottom: 16,
                }}
            >
                Create Album
            </Button>
        </Space>
    );

}