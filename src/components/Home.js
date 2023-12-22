import React from "react";

const Home = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Product Sales Report
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/stats">
                  Statistics
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/bar-stats">
                  Monthly Stats(Bar Chart)
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/pie-stats">
                  Monthly Stats(Pie Chart)
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/combined-stats">
                  Combined Stats
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Home;
