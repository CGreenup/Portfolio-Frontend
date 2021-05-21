import React, { useState, useEffect } from 'react'
import { Card, Modal } from "react-bootstrap";
import { PlusCircle, QuestionCircle } from "react-bootstrap-icons";
import { useCookies } from 'react-cookie';
import { Tooltip } from "reactstrap";
import "../css/Education.css";
import Education from './Education';
import EducationCreation from './EducationCreation';
import EducationDelete from './EducationDelete';
import EducationDisplay from "./EducationDisplay";
import EducationUpdate from './EducationUpdate';

interface User {
    id: number;
    name: string;
    password: string;
    admin: boolean;
}

interface Portfolio {
    id: number;
    name: string;
    user: User;
    submitted: boolean;
    approved: boolean;
    reviewed: boolean;
    feedback: string;
}

interface Education {
    id: number;
    portfolio: Portfolio;
    university: string;
    degree: string;
    graduationDate: string;
    gpa: number;
    logoUrl: string;
}

const EducationContainer = () => {
    const backEndUrl = "http://3.236.213.150:8081/education";
    const [cookies] = useCookies();
    const portfolioId = cookies['portfolio'].id;

    const [educations, setEducations] = useState(Array<Education>());

    //Stores the education that the user wants to edit
    const [editEducation, setEditEducation] = useState(Object);
    const getEditEducation = (education: Education) => setEditEducation(education);

    //State handlers for the creation modal
    const [showCreationModal, setShowCreationModal] = useState(false);
    const handleHideCreationModal = () => setShowCreationModal(false);
    const handleShowCreationModal = () => setShowCreationModal(true);

    //State handlers for the edit modal
    const [showEditModal, setShowEditModal] = useState(false);
    const handleHideEditModal = () => setShowEditModal(false);
    const handleShowEditModal = () => setShowEditModal(true);

    //State handlers for the delete modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleHideDeleteModal = () => setShowDeleteModal(false);
    const handleShowDeleteModal = () => setShowDeleteModal(true);

    //State handler for plus icon
    const [showAddTooltip, setShowAddTooltip] = useState(false);
    const toggleAddTooltip = () => setShowAddTooltip(!showAddTooltip);

    //State handler for details icon
    const [showDetailsTooltip, setShowDetailsTooltip] = useState(false);
    const toggleDetailsTooltip = () => setShowDetailsTooltip(!showDetailsTooltip);

    const messageDetails: string = "Add your education and certification history here";

    useEffect(() => {
        fetch(backEndUrl + "/portfolio/all/" + portfolioId)
            .then(response => response.json())
            .then(json => setEducations(json));
    }, [])

    return (
        <div className="container mt-4">

            <Modal show={showCreationModal} onHide={handleHideCreationModal} backdrop="static">
                <Modal.Header>
                    <Modal.Title>Add Education</Modal.Title>
                </Modal.Header>
                <EducationCreation hideModal={handleHideCreationModal} />
            </Modal>

            <Modal show={showEditModal} onHide={handleHideEditModal} backdrop="static">
                <Modal.Header>
                    <Modal.Title>Edit Education</Modal.Title>
                </Modal.Header>
                <EducationUpdate hideModal={handleHideEditModal} editEducation={editEducation} />
            </Modal>

            <Modal show={showDeleteModal} onHide={handleHideDeleteModal} backdrop="static">
                <Modal.Header>
                    <Modal.Title>Delete Warning</Modal.Title>
                </Modal.Header>
                <EducationDelete hideModal={handleHideDeleteModal} editEducation={editEducation} />
            </Modal>

            <Card id="card-container">
                <Card.Header id="header-project">
                    <h4>
                        Education
                        <QuestionCircle id="card-info-education" />
                        <Tooltip
                            target="card-info-education"
                            isOpen={showDetailsTooltip}
                            toggle={toggleDetailsTooltip} >
                            {messageDetails}
                        </Tooltip>

                        <PlusCircle id="add-education" onClick={handleShowCreationModal} />
                        <Tooltip
                            target="add-education"
                            isOpen={showAddTooltip}
                            toggle={toggleAddTooltip} >
                            Add Education
                        </Tooltip>
                    </h4>
                </Card.Header>

                <Card.Body>
                    {educations.map((education, index) => (
                        <EducationDisplay getEditEducation={getEditEducation} showEditModal={handleShowEditModal} showDeleteModal={handleShowDeleteModal} currentEducation={education} index={index} key={index} />
                    ))}
                    <Card.Text className="education"></Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default EducationContainer;
