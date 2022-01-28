import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link } from "react-router-dom";
export const mainListItems = (
  <div>
    <ListItem component={Link} to="/Admin/Medicine/GetAll" button>
      <ListItemIcon>
        <MedicalServicesIcon />
      </ListItemIcon>
      <ListItemText primary="Quản lý thuốc" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
  </div>
);
