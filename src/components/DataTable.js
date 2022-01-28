import { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  IconButton,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import moment from "moment";
import { Link } from "react-router-dom";

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function QuickSearchToolbar(props) {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? "visible" : "hidden" }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{
          width: {
            xs: 1,
            sm: "auto",
          },
          m: (theme) => theme.spacing(1, 0.5, 1.5),
          "& .MuiSvgIcon-root": {
            mr: 0.5,
          },
          "& .MuiInput-underline:before": {
            borderBottom: 1,
            borderColor: "divider",
          },
        }}
      />
    </Box>
  );
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const columnsMap = new Map();
function setDisplayColumn() {
  columnsMap.set("id", { field: "id", headerName: "Id", width: 50 });
  columnsMap.set("name", {
    field: "name",
    headerName: "Tên thuốc",
    editable: true,
  });
  columnsMap.set("salesPrice", {
    field: "salesPrice",
    headerName: "Giá bán",
    editable: true,
  });
  columnsMap.set("quantity", {
    field: "quantity",
    headerName: "Số lượng",
    editable: true,
  });
  columnsMap.set("salesUnit", {
    field: "salesUnit",
    headerName: "Đơn vị bán",
    editable: true,
  });
  columnsMap.set("entryQuantity", {
    field: "entryQuantity",
    headerName: "Số lượng nhập",
    editable: true,
    width: 120,
  });
  columnsMap.set("entryUnit", {
    field: "entryUnit",
    headerName: "Đơn vị nhập",
    editable: true,
    width: 110,
  });
  columnsMap.set("entryDate", {
    field: "entryDate",
    headerName: "Ngày nhập",
    editable: true,
    type: "date",
    width: 110,
  });
  columnsMap.set("expiryDate", {
    field: "expiryDate",
    headerName: "Ngày hết hạn",
    editable: true,
    type: "date",
    width: 120,
  });
  // columnsMap.set("exchangeRatio", {
  //   field: "exchangeRatio",
  //   headerName: "Tỷ lệ đổi",
  // });
}
setDisplayColumn();

function formatDate(medicines) {
  medicines.forEach((medicine) => {
    medicine.entryDate = moment(medicine.entryDate).format("DD/MM/YYYY");
    medicine.expiryDate = moment(medicine.expiryDate).format("DD/MM/YYYY");
  });

  return medicines;
}

export default function QuickFilteringGrid() {
  const [searchText, setSearchText] = useState("");
  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);
  const [medicineData, setMedicineData] = useState({});
  const [snackbar, setSnackbar] = useState(null);

  const [editRowsModel, setEditRowsModel] = useState({});

  const handleEditRowsModelChange = useCallback((model) => {
    setEditRowsModel(model);
  }, []);

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const updateUrl = serverUrl + "/api/Medicine/Update";

  const handleEditCommit = useCallback(async (params) => {
    try {
      // Make the HTTP request to save in the backend
      const body = {
        id: params.id,
        [params.field]: params.value,
      };
      console.log(editRowsModel);
      console.log("this is body");
      console.log(body);

      // setSnackbar({ children: "User successfully saved", severity: "success" });
      // setRows((prev) =>
      //   prev.map((row) =>
      //     row.id === params.id ? { ...row, ...response } : row
      //   )
      // );
    } catch (error) {
      setSnackbar({ children: "Error while saving user", severity: "error" });
      // Restore the row in case of error
      setRows((prev) => [...prev]);
    }
  }, []);
  useEffect(() => {
    fetch(`${serverUrl}/api/Medicine/GetMedicines`)
      .then((res) => res.json())
      .then((data) => {
        let headers = Object.keys(data[0]);

        let cols = [];
        headers.forEach((header) => {
          const item = columnsMap.get(header);

          // display id and name at index 0 and 1;
          if (header === "id") {
            cols.splice(0, 0, item);
          } else if (header === "name") {
            cols.splice(1, 0, item);
          } else if (item != null) {
            cols.push(item);
          }
        });

        data = formatDate(data);
        setMedicineData(data);
        setCols(cols);
        setRows(data);
      });
  }, []);

  const handleCloseSnackbar = () => setSnackbar(null);

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = medicineData.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };

  return (
    <Box
      sx={{ height: 700, width: 1, display: "flex", flexDirection: "column" }}
    >
      <Button
        variant="outlined"
        color="success"
        sx={{ alignSelf: "flex-end", mb: 2 }}
        component={Link}
        to="/Admin/Medicine/Add"
      >
        Thêm
      </Button>
      <DataGrid
        components={{ Toolbar: QuickSearchToolbar }}
        editRowsModel={editRowsModel}
        onEditRowsModelChange={handleEditRowsModelChange}
        onCellEditCommit={handleEditCommit}
        rows={rows}
        columns={cols}
        componentsProps={{
          toolbar: {
            value: searchText,
            onChange: (event) => requestSearch(event.target.value),
            clearSearch: () => requestSearch(""),
          },
        }}
      />
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </Box>
  );
}
