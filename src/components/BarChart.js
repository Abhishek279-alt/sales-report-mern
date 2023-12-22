import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, LinearScale, CategoryScale, Tooltip, Legend);

const BarChart = () => {
  const [month, setMonth] = useState("-03-");
  const [products, setProducts] = useState([]);
  const productsParsed = products.filter(
    (item) => (item.price = parseFloat(item.price))
  );

  const conditionOne =
    productsParsed.filter((item) => item.price > 0 && item.price <= 100) || 0;
  const conditionTwo =
    productsParsed.filter((item) => item.price >= 101 && item.price <= 200) ||
    0;
  const conditionThree =
    productsParsed.filter((item) => item.price >= 201 && item.price <= 300) ||
    0;
  const conditionFour =
    productsParsed.filter((item) => item.price >= 301 && item.price <= 400) ||
    0;
  const conditionFive =
    productsParsed.filter((item) => item.price >= 401 && item.price <= 500) ||
    0;
  const conditionSix =
    productsParsed.filter((item) => item.price >= 501 && item.price <= 600) ||
    0;
  const conditionSeven =
    productsParsed.filter((item) => item.price >= 601 && item.price <= 700) ||
    0;
  const conditionEight =
    productsParsed.filter((item) => item.price >= 701 && item.price <= 800) ||
    0;
  const conditionNine =
    productsParsed.filter((item) => item.price >= 801 && item.price <= 900) ||
    0;
  const conditionTen = productsParsed.filter((item) => item.price > 901) || 0;

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

  const data = {
    labels: [
      "0-100",
      "101-200",
      "201-300",
      "301-400",
      "401-500",
      "501-600",
      "601-700",
      "701-800",
      "801-900",
      "900-above",
    ],
    datasets: [
      {
        label: "No. of items",
        data: [
          conditionOne.length,
          conditionTwo.length,
          conditionThree.length,
          conditionFour.length,
          conditionFive.length,
          conditionSix.length,
          conditionSeven.length,
          conditionEight.length,
          conditionNine.length,
          conditionTen.length,
        ],
        backgroundColor: "tomato",
        borderColor: "red",
        borderWidth: 1,
      },
    ],
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const getStats = async () => {
    let response = await fetch(`http://localhost:5000/stats/${month}`);
    response = await response.json();
    setProducts(response);
    // console.warn(response);
    console.warn(conditionOne);
  };

  useEffect(() => {
    getStats();
  }, [month]);
  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-md-12 d-flex flex-row justify-content-center align-items-center my-3">
          <span>
            <h2>Statistics(by Price Range) - {monthName[month]}</h2>
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
        <div
          className="col-md-8 col-sm-12 d-flex justify-content-center my-3 mx-auto"
          id="chart-container"
        >
          <Bar data={data} />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
