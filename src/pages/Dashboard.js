import React from "react";
import { useState, useEffect} from "react";
import ProvidersTable from "../components/ProvidersTable.js";
import PaginationComponent from "../components/Pagination";
import Skeleton from '@yisheng90/react-loading';
import ReactBSAlert from "react-bootstrap-sweetalert";

//Reacstrap Components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Container,
    Col,
    Row,
    FormGroup,
    Input
} from "reactstrap";

function Dashboard({setShowButton}) {

    setShowButton(true);

    const [dataProviders, setDataProviders] = useState([]);
    const [dataFind, setDataFind] = useState(false);

    //Para saber en qué página nos encontramos actualmente
    const [currentPage, setCurrentPage] = useState(1);

    //Para saber cuantas páginas (de proveedores) son
    const [pages, setPages] = useState();

    const [name, setName] = useState("");
    const [razonSocial, setRazonSocial] = useState("");
    const [address, setAddress] = useState("");

    const [nameState, setNameState] = useState("");
    const [razonSocialState, setRazonSocialState] = useState("");
    const [addressState, setAddressState] = useState("");

    function goToNextPage() {
        setCurrentPage((pages) => pages + 1)
    }
   
    function goToPreviousPage() {
        setCurrentPage((pages) => pages - 1)
    }

    function goToFirstPage() {
        setCurrentPage(1)
    }

    function goToLastPage() {
        setCurrentPage(pages)
    }

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / 3) * 3;
        return new Array(3).fill().map((_, idx) => start + idx + 1);
    };

    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        if(pageNumber<=pages)
        {
            setCurrentPage(pageNumber);
        }
    }

    useEffect(() => {
        var url = new URL(`${process.env.REACT_APP_API_URI}providers/get-pages/`);
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
            setPages(data.pages);
        })
        .catch(function(err) {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        setDataFind(false);
        var url = new URL(`${process.env.REACT_APP_API_URI}providers/${currentPage}/`);
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
            //Simular la descarga de datos 
            setTimeout(function(){
                setDataProviders(data);
                setDataFind(true);
            },2000);
        })
        .catch(function(err) {
            console.log(err);
        });
    }, [currentPage]);

    //Renderizado condicional
    function Providers() {
        return <ProvidersTable dataTable = {dataProviders} getDataProviders = {getDataProviders} autoCloseAlert2 = {autoCloseAlert2}/>;
    }

    function getDataProviders(current)
    {
        setCurrentPage(current);
        setDataFind(false);
        var url = new URL(`${process.env.REACT_APP_API_URI}providers/${current}/`);
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
            //Simular la descarga de datos 
            setTimeout(function(){
                setDataProviders(data);
                getPages();
                setDataFind(true);
            },2000);
        })
        .catch(function(err) {
            console.log(err);
        });
    }

   function getPages()
   {
        var url = new URL(`${process.env.REACT_APP_API_URI}providers/get-pages/`);
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
            setPages(data.pages);
        })
        .catch(function(err) {
            console.log(err);
        });
   }

    const [alert2, setAlert2] = React.useState(null);

    const autoCloseAlert2 = (mensaje) => {
        setAlert2(
            <ReactBSAlert
                style={{ display: "block", marginTop: "auto", marginBottom: "auto" }}
                title=""
                showConfirm={false}
            >
                &nbsp;
                {mensaje}
            </ReactBSAlert>
        );
        setTimeout(hideAlert2, 2000);
    };

    const hideAlert2 = () => {
        setAlert2(null);
    };

    //Function that verifies if a string has a given length or not
    const verifyLength = (value, length) => {
        if (value.length >= length) {
        return true;
        }
        return false;
    };

    const isValidated = () => {
        if (
            nameState === "has-success" &&
            razonSocialState === "has-success" &&
            addressState === "has-success"
        ) {
            return true;
        } else {
            if (nameState !== "has-success") {
                setNameState("has-danger");
            }
            if (razonSocialState !== "has-success") {
                setRazonSocialState("has-danger");
            }
            if (addressState !== "has-success") {
                setAddressState("has-danger");
            }
            return false;
        }
    };

    const registerClick = () => {
        
        if(isValidated()===true)
        {
           addRegister()
        }
    };

    function addRegister(){

        const catRegister = {
            name: name,
            razonSocial: razonSocial,
            address: address
        };

        console.log(catRegister);
    
        fetch(`${process.env.REACT_APP_API_URI}providers/insert/`, {
            method: "POST",
            body: JSON.stringify(catRegister),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.success === false)
            {
                autoCloseAlert2(data.message);
                setName("");
                setRazonSocial("");
                setAddress("");
                setNameState("");
                setRazonSocialState("");
                setAddressState("");
            }
            else{
                autoCloseAlert2(data.message);
                getPages();
                setCurrentPage(1);
                setName("");
                setRazonSocial("");
                setAddress("");
                setNameState("");
                setRazonSocialState("");
                setAddressState("");
            }
        });
    }

    return dataFind === false ? (
        <>
            <Container className="dashboard-container">
                <Row>
                    <Col className="ml-auto mr-auto" lg="12">
                        <Card className="card-login">
                            <CardHeader className="card-header">
                                <Row>
                                    <Col className="ml-auto mr-auto" lg="12">
                                        <h3 className="dashboard-header">Administración de Proveedores</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col>
                                        <FormGroup className={`has-label ${nameState}`}>
                                            <label className="card-label">Nombre *</label>
                                            <Input
                                                className="card-input"
                                                name="name"
                                                type="text"
                                                autoComplete="off"
                                                onChange={(e) => {
                                                    if (!verifyLength(e.target.value, 1)) {
                                                        setNameState("has-danger");
                                                    } else {
                                                        setNameState("has-success");
                                                    }
                                                    setName(e.target.value);
                                                }}
                                            />
                                            {nameState === "has-danger" ? (
                                                <label className="error">
                                                    Este valor es requerido.
                                                </label>
                                            ) : null}
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup className={`has-label ${razonSocialState}`}>
                                            <label className="card-label">Razón Social *</label>
                                            <Input
                                                className="card-input"
                                                name="name"
                                                type="text"
                                                autoComplete="off"
                                                onChange={(e) => {
                                                    if (!verifyLength(e.target.value, 1)) {
                                                        setRazonSocialState("has-danger");
                                                    } else {
                                                        setRazonSocialState("has-success");
                                                    }
                                                    setRazonSocial(e.target.value);
                                                }}
                                            />
                                            {razonSocialState === "has-danger" ? (
                                                <label className="error">
                                                    Este valor es requerido.
                                                </label>
                                            ) : null}
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup className={`has-label ${addressState}`}>
                                            <label className="card-label">Dirección *</label>
                                            <Input
                                                className="card-input"
                                                name="name"
                                                type="text"
                                                autoComplete="off"
                                                onChange={(e) => {
                                                    if (!verifyLength(e.target.value, 1)) {
                                                        setAddressState("has-danger");
                                                    } else {
                                                        setAddressState("has-success");
                                                    }
                                                    setAddress(e.target.value);
                                                }}
                                            />
                                            {addressState === "has-danger" ? (
                                                <label className="error">
                                                    Este valor es requerido.
                                                </label>
                                            ) : null}
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <Button type="submit" className="btn-round mb-3 card-button" onClick={registerClick}>
                                            Agregar Proveedor
                                        </Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Container className="dashboard-data">
                <Row>
                    <Col className="ml-auto mr-auto" lg="12">
                        <Card className="card-login">
                            <CardBody className="card-header">
                                <Row>
                                    <Col  md="12">
                                    <Skeleton height={25} />
                                    <Skeleton height="25px" />
                                    <Skeleton height="3rem" />
                                    </Col>
                                    <PaginationComponent 
                                        pages = {pages} 
                                        goToPreviousPage = {goToPreviousPage} 
                                        getPaginationGroup = {getPaginationGroup} 
                                        changePage = {changePage} 
                                        goToNextPage = {goToNextPage} 
                                        currentPage = {currentPage}
                                        goToFirstPage = {goToFirstPage}
                                        goToLastPage = {goToLastPage}
                                    />
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    ) : (
        <>
            <Container className="dashboard-container">
                <Row>
                    <Col className="ml-auto mr-auto" lg="12">
                        <Card className="card-login">
                            <CardHeader className="card-header">
                                <Row>
                                    <Col className="ml-auto mr-auto" lg="12">
                                        <h3 className="dashboard-header">Administración de Proveedores</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col>
                                        <FormGroup className={`has-label ${nameState}`}>
                                            <label className="card-label">Nombre *</label>
                                            <Input
                                                className="card-input"
                                                name="name"
                                                type="text"
                                                value={name}
                                                autoComplete="off"
                                                onChange={(e) => {
                                                    if (!verifyLength(e.target.value, 1)) {
                                                        setNameState("has-danger");
                                                    } else {
                                                        setNameState("has-success");
                                                    }
                                                    setName(e.target.value);
                                                }}
                                            />
                                            {nameState === "has-danger" ? (
                                                <label className="error">
                                                    Este valor es requerido.
                                                </label>
                                            ) : null}
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup className={`has-label ${razonSocialState}`}>
                                            <label className="card-label">Razón Social *</label>
                                            <Input
                                                className="card-input"
                                                name="name"
                                                type="text"
                                                value={razonSocial}
                                                autoComplete="off"
                                                onChange={(e) => {
                                                    if (!verifyLength(e.target.value, 1)) {
                                                        setRazonSocialState("has-danger");
                                                    } else {
                                                        setRazonSocialState("has-success");
                                                    }
                                                    setRazonSocial(e.target.value);
                                                }}
                                            />
                                            {razonSocialState === "has-danger" ? (
                                                <label className="error">
                                                    Este valor es requerido.
                                                </label>
                                            ) : null}
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup className={`has-label ${addressState}`}>
                                            <label className="card-label">Dirección *</label>
                                            <Input
                                                className="card-input"
                                                name="name"
                                                type="text"
                                                value={address}
                                                autoComplete="off"
                                                onChange={(e) => {
                                                    if (!verifyLength(e.target.value, 1)) {
                                                        setAddressState("has-danger");
                                                    } else {
                                                        setAddressState("has-success");
                                                    }
                                                    setAddress(e.target.value);
                                                }}
                                            />
                                            {addressState === "has-danger" ? (
                                                <label className="error">
                                                    Este valor es requerido.
                                                </label>
                                            ) : null}
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <Button type="submit" className="btn-round mb-3 card-button" onClick={registerClick}>
                                            Agregar Proveedor
                                        </Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Container className="dashboard-data">
                <Row>
                    <Col className="ml-auto mr-auto" lg="12">
                        <Card className="card-login">
                            <CardBody className="card-header">
                                <Row>
                                    <Col  md="12">
                                        <Providers/>
                                    </Col>
                                    <PaginationComponent 
                                        pages = {pages} 
                                        goToPreviousPage = {goToPreviousPage} 
                                        getPaginationGroup = {getPaginationGroup} 
                                        changePage = {changePage} 
                                        goToNextPage = {goToNextPage} 
                                        currentPage = {currentPage}
                                        goToFirstPage = {goToFirstPage}
                                        goToLastPage = {goToLastPage}
                                    />
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {alert2}
            </Container>
        </>
    )
}

export default Dashboard;