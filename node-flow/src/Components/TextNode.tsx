import { Stack, Typography } from "@mui/material";
import { Handle, NodeProps, Position } from "reactflow";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
const TextNode = ({ data: { text } }: NodeProps<{ text: string }>) => {
  return (
    <>
      <Stack
        sx={{
          height: "60px",
          width: "200px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "white",
          borderRadius: 1,
        }}
      >
        <Stack
          sx={{
            height: "24px",
            width: "100%",
            backgroundColor: "#B2F0E3",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            px: 1,
            py: "4px",
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
          }}
        >
          <Stack sx={{ alignItems: "center", flexDirection: "row", gap: 0.5 }}>
            <ChatOutlinedIcon sx={{ fontSize: "16px" }} />
            <Typography sx={{ fontWeight: "700", fontSize: "14px" }}>
              Send Message
            </Typography>
          </Stack>
          <Stack
            sx={{
              height: "20px",
              width: "20px",
              backgroundColor: "white",
              borderRadius: "50%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WhatsAppIcon sx={{ fontSize: "16px", color: "green" }} />
          </Stack>
        </Stack>
        <Stack sx={{ pl: 1 }}>
          <Typography>{text}</Typography>
        </Stack>
      </Stack>
      <Handle position={Position.Right} type="source" />
      <Handle position={Position.Left} type="target" />
    </>
  );
};

export default TextNode;
