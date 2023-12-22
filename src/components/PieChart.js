import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const PieChart = () => {
  const [month, setMonth] = useState("-03-");
  const [products, setProducts] = useState([]);
  const menCategory =
    products.filter((item) => item.category === `men's clothing`) || 0;
  const womenCategory =
    products.filter((item) => item.category[0] === "w") || 0;
  const electronicsCategory =
    products.filter((item) => item.category === `electronics`) || 0;
  const jeweleryCategory =
    products.filter((item) => item.category === `jewelery`) || 0;
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
  const data = [
    ["Category", "No. of items"],
    ["Men's clothing", menCategory.length],
    ["Women's clothing", womenCategory.length],
    ["Electronics", electronicsCategory.length],
    ["Jewelery", jeweleryCategory.length],
  ];

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };
  const getStats = async () => {
    let response = await fetch(`http://localhost:5000/stats/${month}`);
    response = await response.json();
    setProducts(response);
    console.warn(response);
    console.log("men:", menCategory);
    console.log("women:", menCategory);
    console.log("electronics:", electronicsCategory);
    console.log("jewelery", jeweleryCategory);
  };

  useEffect(() => {
    getStats();
  }, [month]);
  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-md-12 d-flex flex-row justify-content-center align-items-center my-3">
          <span>
            <h2>Statistics(by Category) - {monthName[month]}</h2>
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
        <div className="col-12">
          <Chart
            chartType="PieChart"
            data={data}
            width={"100%"}
            height={"400px"}
          />
        </div>
      </div>
    </div>
  );
};

export default PieChart;
