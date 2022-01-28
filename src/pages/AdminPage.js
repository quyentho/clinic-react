import DashboardLayout from "../layouts/DashboardLayout";
import DataTable from "../components/DataTable";
import MedicineForm from "../components/MedicineForm";
import { BrowserRouter, Routes, Link, Route } from "react-router-dom";

function AdminPage() {
  return (
    <>
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/Admin">
              <Route path="Medicine">
                <Route path="Add" element={<MedicineForm />}></Route>
                <Route index path="GetAll" element={<DataTable />}></Route>
              </Route>
            </Route>
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </>
  );
}
export default AdminPage;
