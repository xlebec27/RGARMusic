import { Form, InputNumber, Popconfirm, Table, Typography, Input, Upload, Button, message, Space } from 'antd';
import { useState, useEffect } from 'react';

const originData = [];
for (let i = 0; i < 10; i++) {
    originData.push({
        key: i.toString(),
        name: 'Fake Love',
        artist: 'BTS',
        tags: 'k-pop',
        file: null
    });
}

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export function CreateAlbum() {

    const onFinish = (values) => {
        console.log("Success:", values);
        //Can directly call props here
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const onSubmit = (values) => {
        console.log("Success:", values);
    };

    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [files, setFiles] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const [album, setAlbum] = useState({})
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            artist: '',
            tags: '',
            file: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
                console.log('values: ', data)
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
                console.log('values: ', data)
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
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
            title: 'tags',
            dataIndex: 'tags',
            width: '20%',
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
                        <Button>Click to Upload</Button>
                        {/* add icon  */}
                    </Upload>
                )
            }
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" cancelText="No" okText="Yes" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'artist' ? 'text' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

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
            <Form form={form} component={false}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                onSubmit={onSubmit}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={false}

                />
            </Form>
        </Space>
    );
};