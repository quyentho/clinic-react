import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Paper,
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import DateAdapter from "@mui/lab/AdapterMoment";
import DatePicker from "./DatePicker";
function MedicineForm() {
  const { register, handleSubmit, control, watch } = useForm();

  const [watchEntryUnit, watchSalesUnit, watchExchange] = watch([
    "EntryUnit",
    "SalesUnit",
    "ExchangeRatio",
  ]);

  const navigate = useNavigate();
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const addUrl = serverUrl + "/api/Medicine/Add";
  const onSubmit = (data) => {
    const response = fetch(addUrl, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    response.then(navigate("../GetAll"));
  };

  return (
    <Box sx={{ height: 1, width: 1 }}>
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 2, mb: -2 }}>
        <Typography style={{ color: "#2E7D32" }} variant="h4">
          Thêm thuốc mới
        </Typography>
      </Container>
      <Box
        component="form"
        sm={12}
        xs={{ display: "flex", justifyContent: "center", alignItem: "center" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Container maxWidth="sm">
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Grid container spacing={3}>
              <Grid item>
                <TextField
                  required
                  {...register("Name")}
                  label="Tên thuốc"
                  color="success"
                  focused
                  sx={{ mr: 2 }}
                />
              </Grid>
              <Grid item>
                <TextField
                  {...register("SalesPrice")}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  required
                  label="Giá bán"
                  color="success"
                  focused
                />
              </Grid>
              <Grid item>
                <TextField
                  {...register("SalesUnit")}
                  required
                  label="Đơn vị bán"
                  color="success"
                  focused
                  sx={{ mr: 2 }}
                />
              </Grid>
              <Grid item>
                <TextField
                  {...register("EntryQuantity")}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  label="Số lượng nhập"
                  color="success"
                  focused
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  required
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  {...register("EntryPrice")}
                  label="Giá Nhập"
                  color="success"
                  focused
                  sx={{ mr: 2 }}
                />
              </Grid>
              <Grid item>
                <TextField
                  {...register("EntryUnit")}
                  label="Đơn vị nhập"
                  color="success"
                  focused
                  required
                />
              </Grid>
              <Grid item sx={{ width: 1 / 2 }}>
                <Controller
                  control={control}
                  name="EntryDate"
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      initValue={value}
                      onChange={onChange}
                      label="Ngày nhập"
                      DateAdapter={DateAdapter}
                    ></DatePicker>
                  )}
                />
              </Grid>
              <Grid item sx={{ width: 1 / 2 }}>
                <Controller
                  control={control}
                  name="ExpiryDate"
                  render={({ field: { onChange } }) => (
                    <DatePicker
                      onChange={onChange}
                      label="Hạn sử dụng"
                      DateAdapter={DateAdapter}
                    ></DatePicker>
                  )}
                />
              </Grid>

              <Grid item>
                <TextField
                  {...register("ExchangeRatio")}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  helperText={`${watchExchange} ${watchSalesUnit} / ${watchEntryUnit}`}
                  label="Tỷ lệ chuyển đổi"
                  placeholder={`1 ${watchEntryUnit} ? ${watchSalesUnit}`}
                  color="success"
                  focused
                  required
                />
              </Grid>
              <Grid
                container
                sx={{ width: 1, justifyContent: "center", mt: 2 }}
              >
                <LoadingButton
                  type="submit"
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  color="success"
                  variant="contained"
                >
                  Thêm Mới
                </LoadingButton>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
export default MedicineForm;
