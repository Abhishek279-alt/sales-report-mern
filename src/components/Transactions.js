import React, { useEffect, useState } from "react";

const Transactions = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [month, setMonth] = useState("-");
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const mainList = products.filter(
    (item, index) => index >= count && index < pageSize
  );

  const totalpages = Math.ceil(products.length / 10);
  const getDefaultData = async () => {
    let result = await fetch(`http://localhost:5000/search/${month}`);
    result = await result.json();
    setProducts(result);
    console.log(result);
  };

  const getQueryData = async () => {
    let result = await fetch(`http://localhost:5000/search/${month}/${query}`);
    result = await result.json();
    setProducts(result);
    console.log(result);
  };

  const monthChange = (e) => {
    setMonth(e.target.value);
  };
  const handleQuery = (e) => {
    const timeout = setTimeout(setQuery(e.target.value), 500);

    return clearTimeout(timeout);
  };
  useEffect(() => {
    getDefaultData();
    if (query !== "") {
      getQueryData();
    }
  }, [month, query]);
  return (
    <div className="container">
      <div className="row my-3">
        <div className="col-12">
          <h2 className="text-center">Transactions</h2>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Username"
              value={query}
              onChange={handleQuery}
            />
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={monthChange}
          >
            <option selected value="-03-">
              Default
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
            <option value="-">All Months</option>
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
                mainList.map((item, index) => {
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
        <div className="col-12">
          <div className="row">
            <div className="col-6">
              <h6>
                Page {pageCount} of {totalpages}
              </h6>
            </div>
            <div className="col-6">
              <span className="mx-2">
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => {
                    setPageCount(pageCount - 1);
                    setCount(count - 10);
                    setPageSize(pageSize - 10);
                  }}
                  disabled={pageCount <= 1 ? true : false}
                >
                  {"<<"}
                </button>
              </span>
              <span className="mx-2">
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => {
                    setPageCount(pageCount + 1);
                    setCount(count + 10);
                    setPageSize(pageSize + 10);
                  }}
                  disabled={pageCount >= totalpages ? true : false}
                >
                  {">>"}
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
