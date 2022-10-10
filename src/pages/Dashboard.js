import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect} from "react";
import Navbar from "../components/Navbar";
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
} from "reactstrap";

function Dashboard() {

    const [dataProviders, setDataProviders] = useState([]);
    const [dataFind, setDataFind] = useState(false);

    //Para saber en qué página nos encontramos actualmente
    const [currentPage, setCurrentPage] = useState(1);

    //Para saber cuantas páginas (de proveedores) son
    const [pages, setPages] = useState();

    //Para saber que usuario se va a eliminar
    const [record, setRecord] = useState("");

    const history = useHistory();

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

    function getDataProviders()
    {
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

    return dataFind === false ? (
        <>
            <Navbar/>
            <Container className="dashboard-container">
                <Row>
                    <Col className="ml-auto mr-auto" lg="12" md="6">
                        <Card className="card-login">
                            <CardHeader className="card-header">
                                <Row>
                                    <Col className="ml-auto mr-auto" lg="12" md="6">
                                        <h3 className="dashboard-header">Administración de Proveedores</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Container className="dashboard-data">
                <Row>
                    <Col className="ml-auto mr-auto" lg="12" md="6">
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
            <Navbar/>
            <Container className="dashboard-container">
                <Row>
                    <Col className="ml-auto mr-auto" lg="12" md="6">
                        <Card className="card-login">
                            <CardHeader className="card-header">
                                <Row>
                                    <Col className="ml-auto mr-auto" lg="12" md="6">
                                        <h3 className="dashboard-header">Administración de Proveedores</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                        </Card>
                    </Col>
                </Row>
                {alert2}
            </Container>
            <Container className="dashboard-data">
                <Row>
                    <Col className="ml-auto mr-auto" lg="12" md="6">
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