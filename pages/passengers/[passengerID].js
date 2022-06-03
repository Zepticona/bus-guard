import React, {useState, useEffect} from 'react';
import { Table, Tag, Space } from 'antd';
import { useRouter } from "next/router";
import axios from "axios";

const App = () => {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'NID',
        dataIndex: 'nid',
        key: 'nid',
      },
      {
        title: 'Bus Status',
        dataIndex: 'busStatus',
        key: 'busStatus',
      },
      {
        title: 'Panic Status',
        key: 'panicStatus',
        dataIndex: 'panicStatus'
      },
      {
        title: 'Bus Location',
        key: 'busLocation',
        dataIndex: 'busLocation'
      },
      {
        title: 'Cut Off Engine',
        key: 'shutEngine',
        render: (_, record) => (
          <Space size="middle">        
            <a>Shut Engine</a>
          </Space>
        ),
      },
    ];
    // const data = [
    //   {
    //     key: '1',
    //     name: 'John Brown',
    //     age: 32,
    //     address: 'New York No. 1 Lake Park',
    //     tags: ['nice', 'developer'],
    //   },
    //   {
    //     key: '2',
    //     name: 'Jim Green',
    //     age: 42,
    //     address: 'London No. 1 Lake Park',
    //     tags: ['loser'],
    //   },
    //   {
    //     key: '3',
    //     name: 'Joe Black',
    //     age: 32,
    //     address: 'Sidney No. 1 Lake Park',
    //     tags: ['cool', 'teacher'],
    //   },
    // ];
    const [data, setData] = useState([{
        key: '1',
        name: '',
        nid: 0,
        busStatus: '',
        panicStatus: '',
        busLocation: '',
        shutEngine: ''
    }]);
    const [currentBusId, setCurrentBusId] = useState('');
    const router = useRouter();
    const userId = router?.query?.id;
    // console.log(router.query.id);
    useEffect(() => {
        // console.log(data);
        // Get data for user
        axios.get(`http://localhost:5000/api/v1/passenger/${userId}`)
        .then( res => {
            const {name, nid, currentBusId} = res.data.data[0]
            console.log(res.data);
            axios.get(`http://localhost:5000/api/v1/bus/${currentBusId}`)
            .then( res => {
                const {location, isPanicked, isRunning} = res.data.data[0];
                // console.log(res);
                setData([{
                    key: '1',
                    name, nid, location, isPanicked, isRunning
                }]);

            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }, [userId]);
    
    return (
        <Table columns={columns} dataSource={data} />
    )
} 

export default App;