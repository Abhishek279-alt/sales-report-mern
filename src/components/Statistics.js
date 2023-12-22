import React, { useEffect, useState } from "react";

const Statistics = () => {
  const [month, setMonth] = useState("-03-");
  const [products, setProducts] = useState([]);
  const SoldItems = products.filter((item) => item.sold === "true") || 0;
  const unsoldItems = products.filter((item) => item.sold === "false") || 0;
  const getTotalPrice = () => {
    let sum = 0.0;
    SoldItems.forEach((element) => {
      let soldprice = parseFloat(element.price);
      sum = sum + soldprice;
    });
    return sum;
  };
  const totalSales = getTotalPrice();
  const handleMonthChange = (e) => {
    setMonth(e.target.value);
    console.log(e);
  };
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
  const getStats = async () => {
    let response = await fetch(`http://localhost:5000/stats/${month}`);
    response = await response.json();
    setProducts(response);
    console.warn(response);
    console.warn("Sold: ", SoldItems);
  };

  useEffect(() => {
    getStats();
  }, [month]);
  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-md-12 d-flex flex-row justify-content-center align-items-center my-3">
          <span>
            <h2>Statistics - {monthName[month]}</h2>
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
        <div className="col-12 d-flex flex-row justify-content-center mt-3">
          <div className="card text-bg-info mb-3 w-50">
            <div className="card-body">
              <h5 className="card-title my-4 text-center">
                Total sale: {Math.round(totalSales)}
              </h5>
              <h5 className="card-title my-4 text-center">
                Total Sold Item: {SoldItems.length}
              </h5>
              <h5 className="card-title my-4 text-center">
                Total Not Sold Item: {unsoldItems.length}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
