import {Table, Space} from 'antd'

const columns = [
    {
        title: 'N',
        dataIndex: 'key',
        key: 'key',
        width: '5%'
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Listenings',
        dataIndex: 'listenings',
        key: 'listenings',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <a>Add to Favourite</a>
            <a>Add to Playlist</a>
            <a>Add to Queue</a>
          </Space>
        ),
        width: '20%'
      }
]

export function TrackList(props){

    const data = [
        {
            key: '1',
            name: 'Walk Away Slowly',
            listenings: 3200000
        },
        {
            key: '2',
            name: 'Bouquet',
            listenings: 321433
        },
        {
            key: '3',
            name: 'Arms Like Teeth',
            listenings: 32341351
        }
    ]

    return(
        <Table columns={columns} dataSource={data} pagination={false}/>
    )
}