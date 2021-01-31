import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Container,
  Button,
} from "reactstrap";
import axios from "axios";
import ReactTable from "react-table";
import treeTableHOC from "react-table/lib/hoc/treeTable";
import "react-table/react-table.css";
import "../../assets/scss/plugins/extensions/react-tables.scss";
import Pagination from "react-js-pagination";
import "../../assets/scss/custom.css";
import CrudView from "../../views/partial/CrudView";
import { GridContext } from "../../contexts/GridContext";
import BASE from "../../configs/BASE";
import EditModal from "../../views/partial/EditModal";

const TreeTable = treeTableHOC(ReactTable);

const GridTable = ({ tableName, gridCol, spName, tableCode, fCon }) => {
  // const [BASE.URL, setPort] = useState("http://192.168.10.249:8089");
  // const [BASE.URL, setPort] = useState("https://localhost:44316");

  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [initActivePage, setInitActivePage] = useState(1);
  const [initPageSize, setInitPageSize] = useState(10);
  const [forEdit, setForEdit] = useState(0);
  // const [pageReload, setPageReload] = useState(false);

  const {
    grid,
    gridStore,
    setTotalNo,
    setActivePage,
    setPageSize,
    pageReload,
    gridTableCode,
  } = useContext(GridContext);

  const getColumns = () => {
    axios
      .get(`${BASE.URL}/api/vwCtls/${gridCol}`)
      .then((response) => {
        if (response.status == 200) {
          let allColumn = response.data;

          setColumns(allColumn);
          console.log("all column", allColumn);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getData = () => {
    axios
      .get(
        `${BASE.URL}/api/GridData/${spName}/pn/${grid.activePage}/ps/${grid.pageSize}`
      )
      .then((response) => {
        if (response.status == 200) {
          let allData = response.data[0].data;
          setTotalNo(response.data[0].totalRaw);
          // console.log("active page", response.data[0].pageNo);
          // console.log("grid", grid);
          gridStore(allData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onRowClick = (state, rowInfo, column, instance) => {
    return {
      onClick: (e) => {
        let header = column.Header;
        if (header == "Edit") {
          setForEdit(rowInfo.original.id);
        }
      },
    };
  };
  const handlePageChange = (pNumber) => {
    setActivePage(pNumber);
    axios
      .get(
        `${BASE.URL}/api/GridData/${spName}/pn/${pNumber}/ps/${grid.pageSize}`
      )
      .then((response) => {
        if (response.status == 200) {
          let allData = response.data[0].data;
          gridStore(allData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const changePerPage = (e) => {
    setActivePage(1);
    setPageSize(e.target.value);
    axios
      .get(
        `${BASE.URL}/api/GridData/${spName}/pn/${grid.activePage}/ps/${e.target.value}`
      )
      .then((response) => {
        if (response.status == 200) {
          let allData = response.data[0].data;
          gridStore(allData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const closePage = () => {
    setForEdit(false);
  };
  const checkUpdate = () => {
    setForEdit(false);
    pageReload(!grid.pageReload);
  };
  const handleResetState = () => {
    if (tableCode != grid.gridTableCode) {
      console.log("different location");

      setActivePage(1);
      setPageSize(10);
    } else {
      console.log("same location");
    }
  };

  const modalClose = () => {
    setForEdit(false);
  };

  useEffect(() => {
    getColumns();
    if (!grid.activePage) {
      setActivePage(initActivePage);
    }
    if (!grid.pageSize) {
      setPageSize(initPageSize);
    }
    if (tableCode != grid.gridTableCode) {
      console.log("different location");
      setActivePage(initActivePage);
      setTotalNo(0);
      gridStore([]);
    }

    getData();

    gridTableCode(tableCode);
  }, [grid.pageSize, grid.activePage, grid.pageReload]);
  return (
    <div>
      {forEdit ? (
        <>
          <EditModal
            tableName={tableName}
            gridCol={gridCol}
            tableCode={tableCode}
            fCon={fCon}
            forEdit={forEdit}
            checkUpdate={checkUpdate}
            modalOpen={forEdit}
            modalClose={modalClose}
          />
        </>
      ) : (
        <Card>
          <CardHeader>
            <Row>
              <Col>
                <h3 className="primary">{tableName} </h3>
              </Col>
            </Row>
          </CardHeader>
          <CardHeader>
            <Row style={{ width: "100%" }}>
              <Col>
                <h5>Total Record(s) {grid.totalNo}</h5>
              </Col>
              <Col>
                <h5>
                  Record(s) Per Page
                  <select
                    name="per-page"
                    onChange={changePerPage}
                    className="badge badge-glow dark btn btn-sm"
                    style={{
                      marginLeft: 7,
                      fontWeight: 700,
                      border: "1px solid",
                    }}
                    value={grid.pageSize}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </h5>
              </Col>
              <Col>
                <h5>
                  Current Page {grid.activePage} of{" "}
                  {Math.ceil(grid.totalNo / grid.pageSize)}
                </h5>
              </Col>
              <Col>
                <Pagination
                  activePage={parseInt(grid.activePage)}
                  itemsCountPerPage={parseInt(grid.pageSize)}
                  totalItemsCount={parseInt(grid.totalNo)}
                  pageRangeDisplayed={1}
                  onChange={handlePageChange}
                />
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <TreeTable
              filterable
              className="nested-table"
              defaultFilterMethod={(filter, row, column) => {
                const id = filter.pivotId || filter.id;
                return row[id] !== undefined
                  ? String(row[id])
                      .toLowerCase()
                      .includes(filter.value.toLowerCase())
                  : true;
              }}
              data={grid.data}
              columns={columns.map((res) => ({
                Header: res.displayName,
                accessor: res.ccName,
              }))}
              showPagination={false}
              getTdProps={onRowClick}
              defaultPageSize={parseInt(grid.pageSize)}
              showPageSizeOptions={false}
              key={grid.pageSize}
              minRows={0}
              SubComponent={(row) => {
                // a SubComponent just for the final detail
                const columns = [
                  {
                    Header: "Property",
                    accessor: "property",
                    width: 200,
                    Cell: (ci) => {
                      return `${ci.value}:`;
                    },
                    style: {
                      backgroundColor: "#DDD",
                      textAlign: "right",
                      fontWeight: "bold",
                    },
                  },
                  { Header: "Value", accessor: "value" },
                ];
                const rowData = Object.keys(row.original).map((key) => {
                  return {
                    property: key,
                    value: row.original[key].toString(),
                  };
                });
              }}
            />
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default GridTable;
