import React, {useState} from "react";
const [selected] = useState([0, 1])

const SelectTable = () => {
  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    selected: selected,
    onSelect: handleOnSelect,
    onSelectAll: handleOnSelectAll,
  };
  // handleBtnClick = () => {
  //   if (!selected.includes(2)) {
  //     this.setState(() => ({
  //       selected: [...selected, 2],
  //     }));
  //   } else {
  //     this.setState(() => ({
  //       selected: selected.filter((x) => x !== 2),
  //     }));
  //   }
  // };

  const handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      this.setState(() => ({
        selected: [...this.state.selected, row.id],
      }));
    } else {
      this.setState(() => ({
        selected: this.state.selected.filter((x) => x !== row.id),
      }));
    }
  };

  handleOnSelectAll = (isSelect, rows) => {
    const ids = rows.map((r) => r.id);
    if (isSelect) {
      this.setState(() => ({
        selected: ids,
      }));
    } else {
      this.setState(() => ({
        selected: [],
      }));
    }
  };
  return (
    <div>
      <BootstrapTable
        keyField="id"
        data={products}
        columns={columns}
        selectRow={selectRow}
      />
    </div>
  );
};

export default SelectTable;
