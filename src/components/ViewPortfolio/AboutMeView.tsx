import axios from 'axios';
import { useEffect, useState } from 'react';
import '../../css/RevatureAboutMe.css';
import { Card } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import {url} from "../../api/api";
import { useAppSelector } from '../../store/Hooks'

interface AboutMe {
    id: number;
    bio: string;
    email: string;
    phone: string;
}

const AboutMeView = () => {
    const [aboutMe, setAboutMe] = useState<AboutMe>();
    const [cookie] = useCookies();
    const portfolioFull: any = useAppSelector((state) => state.fullPortfolio?.fullPortfolio);

    useEffect(() => {
        setAboutMe(portfolioFull.fullPortfolio.aboutMe);
    }, [null]);

    const renderAboutMe = (aboutMe: AboutMe) => {
        return (
            <div>
                <p style={{ marginBottom: '50px' }}>{aboutMe.bio}</p>
                <h6 id="aboutMe-h6">Email: {aboutMe.email}</h6>
                <h6 id="aboutMe-h6">Phone: {aboutMe.phone}</h6>
            </div>
        );
    }

    return (
        <div className="container">
            <Card id="card-container">
                <Card.Header id="header">
                    <h4>About Me</h4>
                </Card.Header>
                <Card.Body>
                    {aboutMe && renderAboutMe(aboutMe)}
                </Card.Body>
            </Card>
        </div>
    );
}

export default AboutMeView;