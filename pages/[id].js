import { useEffect, useState } from "react";
import { Button } from 'antd';
import '../styles/Home.module.css';
import { useRouter } from "next/router";
import axios from "axios";

export default function Profile() {
    const [profile, setProfile] = useState({
        name: 'Lara Croft',
        nid: 24123123123,
        occupation: 'Student'
    });
    const [currentBusId, setCurrentBusId] = useState('');
    const router = useRouter();
    const userId = router?.query?.id;
    // console.log(router.query.id);
    useEffect(() => {
        // Get data for user
        axios.get(`https://desolate-forest-76029.herokuapp.com/api/v1/passenger/${userId}`)
        .then( res => setProfile(res.data.data[0]))
        .catch(err => console.log(err));
    }, [userId]);
    const handlePanic = () => {
        console.log('Panic was clicked.');
        // change bus status 
        axios.patch(`https://desolate-forest-76029.herokuapp.com/api/v1/bus/${profile.currentBusId}`, {
            isPanicked: true
        })
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    }

    const handleCalm = () => {
        console.log('Calm was clicked.');
        // change bus status 
        axios.patch(`https://desolate-forest-76029.herokuapp.com/api/v1/bus/${profile.currentBusId}`, {
            isPanicked: false
        })
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    }

    return (
        <article className="profile">
            <div className="profile-pic" style={{backgroundImage: `url(profile-pic.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat:'no-repeat'}}></div>
            {/* <Img alt="Avatar" className={'profile-pic'} src="/avatar.jpg" /> */}
            <p className="profile-name">{profile?.name}</p>  
            <span className="profile-nid">NID: {profile?.nid}</span>
            <button onClick={handlePanic} className="profile-panic-btn">
                Panic
            </button>
            <Button onClick={handleCalm} type="primary" size="large" className="profile-okay-btn">I am okay</Button>
        </article>
    )
}