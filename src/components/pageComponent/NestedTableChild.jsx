import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";

const NestedTableChild = ({ id, columnChild, urlChild }) => {
  const [data, setData] = useState([]);
  const [columns, setcolumns] = useState([]);

  const getData = async () => {
    let data = await axios.get(`${urlChild}/${id}`);
    setData(data.data);
    console.log("ddddd", data.data);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <BootstrapTable
        // classes="table-child"
        headerWrapperClasses="table-child-header"
        keyField="id"
        data={data}
        columns={columnChild}
        striped
      />
    </div>
  );
};

export default NestedTableChild;
