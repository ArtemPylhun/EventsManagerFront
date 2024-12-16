import React from "react";
import { DNA } from "react-loader-spinner";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DNA
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};

const LoaderComponent = ({ loading, children }) => {
  return (
    <>
      {loading && <Loader />}
      {children}
    </>
  );
};

export default LoaderComponent;
