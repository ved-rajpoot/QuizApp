import React from "react";
import { ThreeCircles, ThreeDots } from "react-loader-spinner";
import "./loadingScreen.css";

const LoadingScreen = () => {
  return (
    <div className="loading">
      <h1 className="blue" style={{ fontSize: "5rem" }}>
        <b>Quizerr</b>
      </h1>
      <ThreeDots color="#29455a" width={130} height={130}  type="Puff" />

      {/* <TailSpin color="#29455a" width={130} height={130} type="BallTriangle" /> */}
      {/* <ThreeCircles color="#29455a" width={130} height={130} type="Bars" /> */}
      {/* <Loader color="#29455a" width={130} height={130}  type="audio" /> */}
    </div>
  );
};
export default LoadingScreen;
