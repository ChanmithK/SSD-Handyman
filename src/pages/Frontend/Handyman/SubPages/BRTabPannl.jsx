import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BuyerRequests from "./BuyerRequests";
import SentOffers from "./SentOffers";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BRTabPannl() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", p: 2, mt: 1 }}>
      <Box
        sx={{
          borderTop: 1,
          borderRight: 1,
          borderLeft: 1,
          borderColor: "#E0E0E0",
          width: "318px",
          borderRadius: "10px",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            sx={{
              borderRight: 1,
              borderColor: "#E0E0E0",
              whiteSpace: "nowrap",
              width: "163px",

              backgroundColor: value === 0 ? "#E4F2FF" : "inherit",
            }}
            label="Buyer Requests"
            {...a11yProps(0)}
          />
          <Tab
            sx={{
              borderRight: 1,
              borderColor: "#E0E0E0",
              whiteSpace: "nowrap",
              width: "153px",

              backgroundColor: value === 1 ? "#E4F2FF" : "inherit",
            }}
            label="Sent Offers"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <BuyerRequests />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <SentOffers />
      </CustomTabPanel>
    </Box>
  );
}
