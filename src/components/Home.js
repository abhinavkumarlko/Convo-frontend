import React from "react";

const Home = () => {
  return (
    <div className="pt-5">
      <div
        className="p-5 text-center bg-image"
        style={{
          background:
            'url("https://img.freepik.com/free-vector/illustration-social-media-concept_53876-18310.jpg?w=1520&t=st=1657633266~exp=1657633866~hmac=139323b5a9329cc3781befe1a67914b0cbf9cf69815d4c8426336085ad83894f")',
          height: "94vh",
        }}
      >
        <div className="mask" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-light " style={{ paddingTop: "360px" }}>
              <h1 className="mb-3">Let's Start Chatting</h1>
              
              <a
                className="btn btn-outline-light btn-lg"
                href="/loginpage"
                role="button"
              >
                Click Here
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;