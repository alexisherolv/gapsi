import React from "react";

//Reacstrap Components
import {
    Button,
    Row,
    Col,
    Pagination,
} from "reactstrap";

function PaginationComponent({pages, goToPreviousPage, getPaginationGroup, changePage,  goToNextPage, currentPage, goToFirstPage, goToLastPage}) {

    return  (
        <div className="pagination-component">
            <Row className="justify-content-md-center">
                    <Col>
                        <Pagination>
                            <Button
                                onClick={goToFirstPage}
                                className={`first ${currentPage === 1 ? 'disabled' : ''}`}
                            >
                                <span> {"<<"} </span>
                            </Button>
                            <Button
                                onClick={goToPreviousPage}
                                className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
                            >
                                prev
                            </Button>
                            {getPaginationGroup().map((item, index) => (
                                <Button key={index} 
                                    onClick={changePage} 
                                    className={`paginationItem ${currentPage === item ? 'active' : null}`}
                                >
                                    <span>{item}</span>
                                </Button>
                            ))}
                            <Button
                                onClick={goToNextPage}
                                className={`next ${currentPage >= pages ? 'disabled' : ''}`}
                            >
                                next
                            </Button>
                            <Button
                                onClick={goToLastPage}
                                className={`last ${currentPage >= pages ? 'disabled' : ''}`}
                            >
                                <span> {">>"} </span>
                            </Button>
                        </Pagination>
                    </Col>
            </Row>
        </div>
    );
}


export default PaginationComponent;