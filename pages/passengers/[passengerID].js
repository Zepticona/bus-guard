import React, {useState, useEffect} from 'react';
import { Table, Tag, Space } from 'antd';
import { useRouter } from "next/router";
import axios from "axios";
import Image from 'next/image';
import Img from '../../components/Img';

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
        title: 'Engine Status',
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
            <a onClick={handleEngineShutdown}>Shut Engine</a>
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
        busLocation: 'Sirajganj Highway'
    }]);
    const [currentBusId, setCurrentBusId] = useState('');
    const router = useRouter();
    const userId = router?.query?.passengerID;
    // console.log(router.query.id);
    useEffect(() => {
        // console.log(data);
        // Get data for user
        axios.get(`https://desolate-forest-76029.herokuapp.com/api/v1/passenger/${userId}`)
        .then( res => {
            const {name, nid, currentBusId} = res.data.data[0];
            setCurrentBusId(currentBusId);
            console.log(res.data);
            axios.get(`https://desolate-forest-76029.herokuapp.com/api/v1/bus/${currentBusId}`)
            .then( res => {
              console.log(res.data.data[0]);
                const {isPanicked, engineRunning, busLocation} = res.data.data[0];
                // console.log(isPanicked, isRunning);
                // console.log(res);
                setData([{
                    key: '1',
                    name, nid,
                    busLocation: <a href='https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.google.com%2Fmaps%2Fplace%2FRajshahi%2BUniversity%2Bof%2BEngineering%2B%2526%2BTechnology%2F%4024.3620992%2C88.6279741%2C14.95z%2Fdata%3D!4m5!3m4!1s0x39fbefd0a55ea957%3A0x2f9cac3357d62617!8m2!3d24.3635683!4d88.6283773%3Ffbclid%3DIwAR0R3TeMOzYXFQ-pu_xYXckawAXL4GwJC90Pi9mE8SW_ANKtS2Flizbc4YY&h=AT3tatfY-s5yJg4u_F3qgbxvYt33MljV2M4lMZK8BSl7cVnrb90tJrV2STgSBgFwq-OtnnTol8nKOcfMNWhx-ra1VFNwKQAIQmfUrwtxsm6sU96eOZoynvDNXAY-aBPQqBYxCQ' target="_blank" rel="noreferrer">See Location</a>,
                    panicStatus: isPanicked ? <span className='status status-red'></span> : <span className='status status-green'></span>, 
                    busStatus: engineRunning ? <span className='status status-green'></span> : <span className='status status-red'></span>, 
                }]);

            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }, [userId]);
    const handleEngineShutdown = () => {      
      console.log('Shutting down engine...');
      // change bus status 
      axios.patch(`https://desolate-forest-76029.herokuapp.com/api/v1/bus/${currentBusId}`, {
        engineRunning: false
      })
      .then(res => {
        // console.log()
      })
      .catch(err => console.log(err));
    }
    return (
      <div>
        <Img alt="Logo" src="/logo.jpeg" className={'logo'} />
        <Table columns={columns} dataSource={data} />
      </div>
        
    )
} 

export default App;