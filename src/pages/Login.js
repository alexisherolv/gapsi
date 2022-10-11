import React from "react";
import {useHistory } from "react-router-dom";
import { useState, useEffect} from "react";

//Reacstrap Components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Form,
    Container,
    Col,
    Row,
} from "reactstrap";

function Login({setShowButton}) {

    setShowButton(false);

    const [version, setVersion] = useState("");
    const [message, setMessage] = useState("");
    const history = useHistory();

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
                                <p className="card-fpassword">{version}</p>
                            </CardFooter>
                        </Card>
                    </Form>
                </Col>
            </Row>
        </Container>
    ) 
}

export default Login;