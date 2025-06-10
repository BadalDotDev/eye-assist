import { Box, styled, Typography } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";

export const StyledHelpIcon = styled(HelpIcon)(({ theme }) => ({
  width: 12,
  height: 12,
  color: theme.palette.error.main,
}));

export const StyledErrorMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: "12px",
  fontWeight: "500",
  marginLeft: "2px",
}));

export const flexRow = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

export const StyledErrorContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});
