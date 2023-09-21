import { Button, Form, Input, Popconfirm, Table, Upload, Space, Select } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import '../assets/AlbumCreate.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { cropImage } from '../features/cropImage';


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

export function CreateAlbum() {

    let navigate = useNavigate();

    const [allTags, setAllTags] = useState([])
    const [allArtists, setAllArtists] = useState([])

    useEffect(() => {
        async function load_data() {
            try {
                const getArtists = await axios.get(import.meta.env.VITE_API_URL + "api/user/artists/");
                var artistsResponse = getArtists.data.map(artist => { return { value: artist.name } })
                setAllArtists(artistsResponse)
            }
            catch (error) {
                console.error(error);
            }
            try {
                const getTags = await axios.get(import.meta.env.VITE_API_URL + "api/user/all-tags/");
                var tagsResponse = getTags.data.map(tag => { return { label: tag.name, value: tag.id } })
                setAllTags(tagsResponse)
            }
            catch (error) {
                console.error(error);
            }
        }
        load_data()
    }, []);


    async function PostAlbum(album, data, e) {
        const track_set = data.map((track) => { return { name: track.name, artist: track.artist, link: track.file } })
        album.track_set = track_set
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", album.name)
        for (var i = 0; i < album.artist.length; i++) {
            formData.append('artist', album.artist[i]);
        }
        for (var i = 0; i < album.tags.length; i++) {
            formData.append('tags', album.tags[i]);
        }
        // formData.append("artist[]", album.artist)
        // formData.append("tags[]", album.tags)
        console.log(cropImage(album.cover));
        formData.append("cover", cropImage(album.cover))
        for (var i = 0; i < album.track_set.length; i++) {
            formData.append(`track_set[${i}]name`, album.track_set[i].name);
            formData.append(`track_set[${i}]artist`, album.track_set[i].artist);
            formData.append(`track_set[${i}]link`, album.track_set[i].link);
        }
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + "api/admin/create-album/",
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },

                }
            )
            console.log(JSON.stringify(response.data));
            navigate("/settings");
        } catch (error) {
            console.log(error);
            if (error?.response?.status === 401) {
                localStorage.clear();
                navigate("/login");
            }
        }
        console.log(formData);
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
        tags: '',
        cover: undefined
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

    const handleArtistsChange = (artist) => {
        console.log(artist);
        setAlbum({ ...album, artist: artist });
    };

    const handleTagsChange = (tags) => {
        console.log(tags);
        setAlbum({ ...album, tags: tags });
    };

    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <Input placeholder="Album name" size="large"
                onChange={(e) => {
                    setAlbum({ ...album, name: e.target.value });
                    console.log('album ', album)
                }
                } />
            <Select
                key="artistSelect"
                mode="tags"
                allowClear
                style={{
                    width: '100%',
                }}
                placeholder="Select artists"
                onChange={handleArtistsChange}
                options={allArtists}
            />
            <Select
                key="tagsSelect"
                mode="multiple"
                allowClear
                style={{
                    width: '100%',
                }}
                placeholder="Select tags"
                onChange={handleTagsChange}
                options={allTags}
            />
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
            {selectedFile && <img src={preview} style={{ width: "20%" }} />}
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