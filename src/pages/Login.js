import React from "react";
import {useHistory } from "react-router-dom";
import { useState, useEffect} from "react";
import ReactBSAlert from "react-bootstrap-sweetalert";
import Cargando from "../assets/img/loading_icon.gif";

//Reacstrap Components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    FormGroup,
    Form,
    Container,
    Col,
    Row,
} from "reactstrap";

function Login() {

    const [version, setVersion] = useState("");
    const [message, setMessage] = useState("");
    const history = useHistory();

    const [errorState, setErrorState] = React.useState("");
    const [error, setError] = React.useState();
    const [errorMessage, setErrorMessage] = React.useState("");

    const [alert2, setAlert2] = React.useState(null);

    useEffect(() => {

        var url = new URL(`${process.env.REACT_APP_API_URI}version/`);

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(function(response) {
            return response.ok ? response.json() : Promise.reject();
        })
        .then(function(data) {
            setVersion(data.version);
        })
        .catch(function(err) {
            console.log(err)
        });
    
    }, []);

    useEffect(() => {

        var url = new URL(`${process.env.REACT_APP_API_URI}message/`);

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(function(response) {
            return response.ok ? response.json() : Promise.reject();
        })
        .then(function(data) {
            setMessage(data.message);
        })
        .catch(function(err) {
            console.log(err)
        });
    
    }, []);
    

    const autoCloseAlert2 = (mensaje) => {
        setAlert2(
            <ReactBSAlert
                style={{ display: "block", marginTop: "auto", marginBottom: "auto" }}
                title=""
                showConfirm={false}
            >
                <Row>
                    <Col sm="4">
                    </Col>
                    <Col sm="4">
                        <img 
                        src = {Cargando} 
                        style ={{ width: "50px", height: "50px" }}
                        />
                    </Col>
                    <Col sm="4">
                    </Col>
                </Row>
                &nbsp;
                {mensaje}
            </ReactBSAlert>
        );
    };
    
    function onSubmitForm(event) {
        event.preventDefault();
        history.push("/dashboard");
    }


    return (
        <Container>
            <Row className="abs-center">
                <Col className="ml-auto mr-auto" lg="4" md="6">
                    <Form className="form" onSubmit={onSubmitForm} >
                        <Card className="card-login">
                            <CardHeader className="card-header">
                                <img className="rounded-circle img-fluid img-thumbnail mx-auto d-block" src={process.env.PUBLIC_URL + '/images/gapsi-profile.png'} width="150px"/>
                                <h3 className="header">{message}</h3>
                            </CardHeader>
                            <CardBody className="card-body">
                                
                            </CardBody>
                            <CardFooter className="card-footer">
                                <div className="card-btn">
                                    <Button type="submit" className="btn-round mb-3 card-button">
                                        Continuar
                                    </Button>
                                </div>
                                {error}
                                <p className="card-fpassword">{version}</p>
                                <FormGroup className={`has-label ${errorState}`}>
                                    {errorState === "has-danger" ? (
                                            <label className="error">{errorMessage}</label>
                                    ) : null}
                                </FormGroup>
                            </CardFooter>
                        </Card>
                    </Form>
                </Col>
            </Row>
            {alert2}
        </Container>
    ) 
}

export default Login;