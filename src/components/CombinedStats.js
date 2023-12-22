import React, { useState, useEffect } from "react";

const CombinedStats = () => {
  const [month, setMonth] = useState("-03-");
  const [sold, setSold] = useState("true");
  const [products, setProducts] = useState([]);
  const SoldUnsoldItems = products.filter((item) => item.sold === sold) || 0;

  const monthName = {
    "-01-": "January",
    "-02-": "February",
    "-03-": "March",
    "-04-": "April",
    "-05-": "May",
    "-06-": "June",
    "-07-": "July",
    "-08-": "August",
    "-09-": "September",
    "-10-": "October",
    "-11-": "November",
    "-12-": "December",
  };
  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };
  const handleSold = (e) => {
    setSold(e.target.value);
    setProducts(SoldUnsoldItems);
  };

  const getMonthlyData = async () => {
    let response = await fetch(`http://localhost:5000/stats/${month}/${sold}`);
    response = await response.json();
    setProducts(response);
    console.warn(response);
  };

  useEffect(() => {
    getMonthlyData();
  }, [month, sold]);
  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-12 d-flex flex-row justify-content-center align-items-center">
          <span>
            <h2>Combined Transactions - {monthName[month]}</h2>
          </span>
          <span className="ms-2">
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={handleMonthChange}
            >
              <option selected value={month}>
                Choose Month
              </option>
              <option value="-01-">January</option>
              <option value="-02-">February</option>
              <option value="-03-">March</option>
              <option value="-04-">April</option>
              <option value="-05-">May</option>
              <option value="-06-">June</option>
              <option value="-07-">July</option>
              <option value="-08-">August</option>
              <option value="-09-">September</option>
              <option value="-10-">October</option>
              <option value="-11-">November</option>
              <option value="-12-">December</option>
            </select>
          </span>
        </div>
        <div className="col-md-6 col-sm-12 my-2">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={handleSold}
          >
            <option selected value={sold}>
              Select item sold
            </option>
            <option value="true">Item sold</option>
            <option value="false">Item not sold</option>
          </select>
        </div>
        <div className="col-12">
          <table className="table table-info table-striped">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Category</th>
                <th scope="col">Sold</th>
                <th scope="col">Image</th>
              </tr>
            </thead>
            <tbody>
              {products.length < 1 ? (
                <h1>No items to display</h1>
              ) : (
                products.map((item, index) => {
                  return (
                    <tr key={item._id}>
                      <th>{item.id}</th>
                      <td className="fw-bold">{item.title}</td>
                      <td>{item.description}</td>
                      <td>{item.price}</td>
                      <td>{item.category}</td>
                      <td>{item.sold}</td>
                      <td>
                        <img
                          src={item.image}
                          className="img-thumbnail"
                          alt="item-pic"
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CombinedStats;
