import React from "react";
import { Row, Col } from "antd";

function MainImage(props) {
  return (
    <Row>
      <Col
        lg={24}
        md={24}
        xs={24}
        style={{
          background: `url('${props.image}')`,
          height: "300px",
          backgroundSize: "100%, cover",
          bacgroundPosition: "center, center",
          width: "100%",
          position: "relative",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div>
          <div
            style={{
              position: "absolute",
              maxWidth: "500px",
              bottom: "2rem",
              marginLeft: "2rem",
            }}
          >
            <h2 style={{ color: "white" }}> {props.title} </h2>
            <p style={{ color: "white", fontSize: "1rem" }}>{props.overview}</p>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default MainImage;
