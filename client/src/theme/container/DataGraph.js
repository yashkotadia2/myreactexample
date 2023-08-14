import React from "react";
import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

import "bootstrap/dist/css/bootstrap.css";
import "../style_sheet/DataGraph.css";


const DataGraph = () => {   
  const [users, setUsers] = useState([]);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [eyeColorObj, setEyeColorObj] = useState({});
  const [search, setSearch] = useState("");

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = currentUsers.slice(firstIndex, lastIndex);
  const numOfPage = Math.ceil(currentUsers.length / recordsPerPage);
  const numbers = [...Array(numOfPage + 1).keys()].slice(1);

  const fetchInfo = () => {
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((json) => {setCurrentUsers(json.users)
                       setUsers(json.users)})
      .finally(() => {});
  };

  const handleSearchInput = (event) => {
    if(search == '')
    {
      setCurrentUsers(users)
      setSearch(event.target.value);
    }
    else{
      console.log("value is:", event.target.value);
      setSearch(event.target.value);
    }
  };
  
  const handleSearchBtn = (event) => {
    setCurrentUsers(users);

    let filteredUsers = Object.values(currentUsers).filter(
      (user) =>
        user["firstName"].toLowerCase().includes(search.toLowerCase()) ||
        user["lastName"].toLowerCase().includes(search.toLowerCase()) ||
        user["age"].toString().includes(search) ||
        user["eyeColor"].toLowerCase().includes(search.toLowerCase()) ||
        user["phone"].toString().includes(search)
    );

    if(filteredUsers == false)
    {
        alert('Nothing Found')
    }
    else{
        setCurrentUsers(filteredUsers);
        data();
    }
  };

  const handleResetBtn = (event) => {
    window.location.reload();
  };

  const sortFirstAsc = (event) => {
    let field = event.currentTarget.id.toString();
    let sortUser = [...currentUsers];

    switch (field) {
      case "firstName":
        sortUser.sort((a, b) => {
          if (a.firstName < b.firstName) {
            return -1;
          }
        });
        break;

      case "lastName":
        sortUser.sort((a, b) => {
          if (a.lastName < b.lastName) {
            return -1;
          }
        });
        break;

      case "age":
        sortUser.sort((a, b) => {
          if (a.age < b.age) {
            return -1;
          }
        });
        break;

      case "eyeColor":
        sortUser.sort((a, b) => {
          if (a.eyeColor < b.eyeColor) {
            return -1;
          }
        });
        break;

      case "phone":
        sortUser.sort((a, b) => {
          if (a.phone < b.phone) {
            return -1;
          }
        });
        break;

      default:
      // code block
    }
    setCurrentUsers(sortUser);
  };

  const sortFirstDesc = (event) => {
    let field = event.currentTarget.id.toString();
    let sortUser = [...currentUsers];

    switch (field) {
      case "firstName":
        sortUser.sort((a, b) => {
          if (a.firstName > b.firstName) {
            return -1;
          }
        });
        break;

      case "lastName":
        sortUser.sort((a, b) => {
          if (a.lastName > b.lastName) {
            return -1;
          }
        });
        break;

      case "age":
        sortUser.sort((a, b) => {
          if (a.age > b.age) {
            return -1;
          }
        });
        break;
      case "eyeColor":
        sortUser.sort((a, b) => {
          if (a.eyeColor > b.eyeColor) {
            return -1;
          }
        });
        break;

      case "phone":
        sortUser.sort((a, b) => {
          if (a.phone > b.phone) {
            return -1;
          }
        });
        break;

      default:
      // code block
    }
    setCurrentUsers(sortUser);
  };

  const changeRowPerPage = (event) => {
    if (event.target.value != "" && event.target.value <= currentUsers.length && event.target.value > 1) {
      setRecordsPerPage(event.target.value);
    }
  };

  function nextPage() {
    if (currentPage !== numbers[numbers.length - 1]) {
      setCurrentPage(currentPage + 1);
    }
  }

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  useEffect(() => {

    if (currentUsers.length > 0) {

        const eyeColorFreq = {};

        for (let index = 0; index < currentUsers.length; index++) {

          let ele = currentUsers[index].eyeColor;
  
          if (eyeColorFreq[ele]) {
              eyeColorFreq[ele] += 1;
  
          } else {
              eyeColorFreq[ele] = 1;
          }
  
        }
  
        setEyeColorObj(eyeColorFreq)
      
      }
  }, [currentUsers,users]);
 
  const data = () => {

    if (currentUsers.length > 0) {
      const eyeColorFreq = {};

      for (let index = 0; index < currentUsers.length; index++) {
        let ele = currentUsers[index].eyeColor;

        if (eyeColorFreq[ele]) {
            eyeColorFreq[ele] += 1;

        } else {
            eyeColorFreq[ele] = 1;
        }

      }

      setEyeColorObj(eyeColorFreq)
    }
  };

  const [multilineData, setMultiLineData] = useState({
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: ["Green", "Brown", "Gray", "Amber", "Blue"],
      legend: {
        position: "top",
        show: true,
        width: 250,
        offsetX: 25,
        offsetY: 0
      },
     
    colors: ['#00b33c', '#cb3434', '#a6a6a6', '#FFBF00', '#4d4dff' ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    console.log("obj",Object.keys(eyeColorObj));
    if(Object.keys(eyeColorObj).length > 0 || true)
    {
        setMultiLineData({ series: [(eyeColorObj['Green'] != undefined ? eyeColorObj['Green'] : 0),
        (eyeColorObj['Brown'] != undefined ? eyeColorObj['Brown'] : 0),
        (eyeColorObj['Gray'] != undefined ? eyeColorObj['Gray'] : 0),
        (eyeColorObj['Amber'] != undefined ? eyeColorObj['Amber'] : 0),
        (eyeColorObj['Blue'] != undefined ? eyeColorObj['Blue'] : 0)]})

    }  
  }, [eyeColorObj]);

  return (
    <>
      <div className="container bg-light">
        <div className="search-container">
          <div className="search-bar">
            <input
              type="text"
              className="search-bar"
              value={search}
              onChange={handleSearchInput}
              placeholder="Search..."
            />
          </div>
          <div className="search-button">
            <button onClick={handleSearchBtn} className="button-search">
              <i className="fa fa-search"></i>
            </button>
            <button onClick={handleResetBtn} className="button-refresh">
              <i className="fa fa-refresh"></i>
            </button>
          </div>
        </div>
        <div className="row flex-wrap">
          <div className="col-lg-9 col-md-12 col-sm-12">
            <h2 className="table-heading">Users Table:</h2>
            <table className="table bordered-table border-dark table-striped text-center">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">
                    <button
                      onClick={sortFirstAsc}
                      id="firstName"
                      className="sort_button me-1"
                    >
                      <i className="fa fa-sort-asc sort_button_icon"></i>
                    </button>
                    First
                    <button
                      onClick={sortFirstDesc}
                      id="firstName"
                      className="sort_button"
                    >
                      <i className="fa fa-sort-desc sort_button_icon"></i>
                    </button>
                  </th>
                  <th scope="col">
                    <button
                      onClick={sortFirstAsc}
                      id="lastName"
                      className="sort_button me-1"
                    >
                      <i className="fa fa-sort-asc sort_button_icon"></i>
                    </button>
                    Last
                    <button
                      onClick={sortFirstDesc}
                      id="lastName"
                      className="sort_button"
                    >
                      <i className="fa fa-sort-desc sort_button_icon"></i>
                    </button>
                  </th>
                  <th scope="col">
                    <button
                      onClick={sortFirstAsc}
                      id="age"
                      className="sort_button me-1"
                    >
                      <i className="fa fa-sort-asc sort_button_icon"></i>
                    </button>
                    Age
                    <button
                      onClick={sortFirstDesc}
                      id="age"
                      className="sort_button"
                    >
                      <i className="fa fa-sort-desc sort_button_icon"></i>
                    </button>
                  </th>
                  <th scope="col">
                    <button
                      onClick={sortFirstAsc}
                      id="eyeColor"
                      className="sort_button me-1"
                    >
                      <i className="fa fa-sort-asc sort_button_icon"></i>
                    </button>
                    Eye Color
                    <button
                      onClick={sortFirstDesc}
                      id="eyeColor"
                      className="sort_button"
                    >
                      <i className="fa fa-sort-desc sort_button_icon"></i>
                    </button>
                  </th>
                  <th scope="col">
                    <button
                      onClick={sortFirstAsc}
                      id="phone"
                      className="sort_button me-1"
                    >
                      <i className="fa fa-sort-asc sort_button_icon"></i>
                    </button>
                    Phone
                    <button
                      onClick={sortFirstDesc}
                      id="phone"
                      className="sort_button"
                    >
                      <i className="fa fa-sort-desc sort_button_icon"></i>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {records.map((user, index) => (
                  <tr
                    key={index}
                    title={index + 1 + (currentPage - 1) * recordsPerPage}
                  >
                    <th scope="row">{user.id}</th>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.age}</td>
                    <td>{user.eyeColor}</td>
                    <td>{user.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <nav className="d-flex justify-content-center">
                <ul className="pagination">
                  <li className="page-item">
                    <a
                      className={
                        "page-link bg-light border-dark " +
                        (currentPage == 1 ? "disabled_link" : "")
                      }
                      onClick={prePage}
                    >
                      Prev
                    </a>
                  </li>
                  {numbers.map((n, i) => (
                    <li className="page-item" key={i}>
                      <a
                        className={
                          "page-link bg-light border-dark " +
                          (currentPage == n ? "active_link" : "")
                        }
                        onClick={() => changeCPage(n)}
                      >
                        {n}
                      </a>
                    </li>
                  ))}
                  <li className="page-item">
                    <a
                      className={
                        "page-link bg-light border-dark " +
                        (currentPage == numbers[numbers.length - 1]
                          ? "disabled_link"
                          : "")
                      }
                      onClick={nextPage}
                    >
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
              <div className="rowsPerPage d-flex justify-content-center">
                <input
                  type="number"
                  onChange={changeRowPerPage}
                  max={currentUsers.length}
                  min="2"
                  class="rows-input"
                  placeholder="Enter Rows Per Page..."
                />
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-12 col-sm-12 mt-3">
            <div id="chart" >
              <h4 className="text-center">Eye Color Pie Chart:</h4>
              <ReactApexChart
                  options={multilineData.options}
                  series={multilineData.series}
                  type="pie"
                  width={350}
                  style={{ width: "100%" , display:"flex", justifyContent:"center", paddingTop: "1.2em"}}
              />
            </div>
          </div>
        </div>  
      </div>
    </>
  );
};

export default DataGraph;
