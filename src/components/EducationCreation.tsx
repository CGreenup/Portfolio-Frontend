import axios from "axios";
import React, { useState, FC, CSSProperties } from 'react'
import { Button, Modal } from "react-bootstrap";
import { useCookies } from "react-cookie";
import "../css/Project.css";
import {url} from "../api/api";
import educationValidation, { educationValidationErrors } from "./validation/EducationValidation";
import styleInvalidElements, { styleInvalidElement } from "./validation/InvalidFormHandling";
import ValidationMsg from './validation/ValidationMsg'

const EducationCreation: FC<{hideModal: Function}>= (props) => {
    const backEndUrl = url + "/education";
    const [cookies, setCookie] = useCookies();
    const portfolio = cookies['portfolio'];

    const [university, setUniversity] = useState("");
    const [degree, setDegree] = useState("");
    const [graduationDate, setGraduationDate] = useState("");
    const [gpa, setGpa] = useState(0.0);
    const [logoUrl, setLogoUrl] = useState("");
    const [validationErrors, setValidationErrors] = useState(Array<string>());
    

    const handleSave = () => {
        const valid = educationValidation(university, degree, graduationDate, gpa);
        const errorElems = educationValidationErrors(university, degree, graduationDate, gpa);

        if(valid){
            console.log("VALID");

            axios
                .post(backEndUrl, {
                    portfolio,
                    university,
                    degree,
                    graduationDate,
                    gpa,
                    logoUrl
                })
                .then((response) => {
                })
                .catch((error) => {
                    console.log("error");
                })
                .then(() => {
                    props.hideModal();
                    window.location.reload();
                });
        }
        else{
            console.log("INVALID");
            let inputElements = document.getElementsByClassName("form-input");
            let gpaElement = document.getElementById("gpa");
            console.log(gpaElement)
            if(gpaElement != null) {
                styleInvalidElement(gpaElement);
            }
            styleInvalidElements(inputElements);
            setValidationErrors(errorElems);
        }
    };

    let addButtonStyles: CSSProperties = {
        background: "rgb(242, 105, 3)",
        borderColor: "rgb(242, 105, 3)"
    }

    return (
        <div>
            <Modal.Body>
                <form method="post">
                    <h6>University Name</h6>
                    <input
                        required
                        type="text"
                        name="university"
                        className="form-input"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                    />
                    <br />
                    <h6>Degree Attained</h6>
                    <input
                        required
                        type="text"
                        name="degree"
                        className="form-input"
                        value={degree}
                        onChange={(e) =>
                            setDegree(e.target.value)
                        }
                    />
                    <br />
                    <h6>Graduation Date</h6>
                    <input
                        required
                        type="date"
                        name="graduationDate"
                        className="form-input"
                        value={graduationDate}
                        onChange={(e) =>
                            setGraduationDate(e.target.value)
                        }
                    />
                    <br />
                    <h6>GPA</h6>
                    <input
                        required
                        id="gpa"
                        type="number"
                        step="0.01"
                        name="gpa"
                        className="form-input"
                        value={gpa}
                        onChange={(e) => setGpa(Number(e.target.value))}
                    />
                    <br />
                    <h6 className="logoUrl">URL for University Logo (Optional)</h6>
                    <input
                        type="text"
                        name="logoUrl"
                        className="form-input-optional"
                        value={logoUrl}
                        onChange={(e) => setLogoUrl(e.target.value)}
                    />
                </form>

                <ValidationMsg errors={validationErrors}></ValidationMsg>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.hideModal()}>
                    Close
                </Button>
                <Button variant="primary" style={addButtonStyles} onClick={() => handleSave()} >
                    Add
                </Button>
            </Modal.Footer>
        </div>
    );
};

export default EducationCreation;
