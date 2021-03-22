import React from "react";
import { Tab, Nav, Col, Row } from "react-bootstrap";

const Categories = () => {
  return (
    <div>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Tab 1</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Tab 2</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <p>
                  lorem ispum skasnxoc qwdqnw wojdsad fdwa asdq so wdol wdaxsx
                  iqd i dnxax iqwd n iqdl qdsokasd qodka,, qojd aqdj dqiqd{" "}
                </p>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <p>
                  lorem ispum skasnxoc qwdqnw wojdsad fdwa asdq so wdol wdaxsx
                  iqd i dnxax iqwd n iqdl qdsokasd qodka,, qojd aqdj dqiqd{" "}
                </p>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default Categories;
