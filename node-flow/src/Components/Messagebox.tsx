import { Stack, Typography } from "@mui/material";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
interface MessageboxProps {
  onCreateNode: () => void;
}
const Messagebox = ({ onCreateNode }: MessageboxProps) => {
  return (
    <Stack direction="row" sx={{ height: "100vh" }}>
      <Stack
        sx={{
          height: "50px",
          width: "140px",
          border: "1px solid #1976D2",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 1,
          py: 4,
          cursor: "pointer",
          my: 2,
          mx:2
        }}
        onClick={onCreateNode}
      >
        <Stack sx={{ alignItems: "center", justifyContent: "center" }}>
          <ChatOutlinedIcon sx={{ color: "#1976D2" }} />
          <Typography
            sx={{ color: "#1976D2", fontSize: "12px", fontWeight: "600" }}
          >
            Message
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Messagebox;
