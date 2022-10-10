import React, { useState, useEffect } from "react";

import {
  Button,
  Row,
  Col,
  Table
} from "reactstrap";

function ProvidersTable({dataTable, setRecord, getDataProviders, autoCloseAlert2}){
    const [dataState, setDataState] = useState(
        dataTable.map((prop, key) => {
          return {
            id: key,
            name: prop.name,
            razonSocial: prop.razonSocial,
            adress: prop.address,
            actions: (
              // ACCIONES A REALIZAR EN CADA REGISTRO
              <div className="actions-center">
                {/*IMPLEMENTAR EDICION PARA CADA REGISTRO */}
                <abbr title="Eliminar">
                  <Button
                    onClick={() => {
                      getRegistro(key);
                    }}
                    color="warning"
                    size="sm"
                    className="btn-icon btn-link edit"
                  >
                    <i className="fa fa-edit" />
                  </Button>
                </abbr>
              </div>
            ),
          };
        })
      );

    function getRegistro(key)
    {
        setRecord(key) 
    }

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
                if(data.message === "error")
                {
                    autoCloseAlert2("No se pudo eliminar el proveedor.");
                    getDataProviders();
                }
                else 
                {
                    autoCloseAlert2("Proveedor eliminado con éxito.");
                    getDataProviders();
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