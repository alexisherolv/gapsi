import React from "react";

import {
  Button,
  Row,
  Col,
  Table
} from "reactstrap";

function ProvidersTable({dataTable, getDataProviders, autoCloseAlert2}){

    function deleteProvider(key)
    {
        const catRegister = {
            name: key,
        };
    
        fetch(`${process.env.REACT_APP_API_URI}providers/delete/`, {
            method: "PUT",
            body: JSON.stringify(catRegister),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.errors) {
                console.log("Hubo un error al procesar la solicitud")
            }
            else{
                if(data.success === false)
                {
                    autoCloseAlert2("No se pudo eliminar el proveedor.");
                    getDataProviders(1);
                }
                else 
                {
                    autoCloseAlert2("Proveedor eliminado con éxito.");
                    getDataProviders(1);
                }
            }
        });
    }

    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">   
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>
                                        #
                                    </th>
                                    <th>
                                        Nombre
                                    </th>
                                    <th>
                                        Razón Social
                                    </th>
                                    <th>
                                        Dirección
                                    </th>
                                    <th>
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataTable.map((item, i) => (
                                        <tr scope="row" key={i}>
                                            <td>{i+1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.razonSocial}</td>
                                            <td>{item.address}</td>
                                            <td> 
                                            <Button
                                                onClick={() => {
                                                    deleteProvider(item.name);
                                                }}
                                                color="warning"
                                                size="sm"
                                                className="btn-icon btn-link edit"
                                            >
                                                Eliminar 
                                            </Button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default ProvidersTable;