import { useState } from "react";
import Img from "./Img";
import { Button } from 'antd';
import '../styles/Home.module.css';

export default function Profile() {
    const [profile, setProfile] = useState({
        name: 'Lara Croft',
        nid: 24123123123,
        occupation: 'Student'
    })
    return (
        <article className="profile">
            <div className="profile-pic" style={{backgroundImage: `url(profile-pic.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat:'no-repeat'}}></div>
            {/* <Img alt="Avatar" className={'profile-pic'} src="/avatar.jpg" /> */}
            <p className="profile-name">{profile.name}</p>  
            <span className="profile-nid">{profile.nid}</span>
            <button className="profile-panic-btn">
                Panic
            </button>
            <Button type="primary" size="large" className="profile-okay-btn">I am okay</Button>
        </article>
    )
}