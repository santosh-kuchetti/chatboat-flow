import {
  Button,
  Divider,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import ReactFlow, {
  Background,
  Connection,
  Node,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "reactflow/dist/style.css";
import Messagebox from "./Components/Messagebox";
import { initialEdges, initialNodes } from "./Constants/flowConstants";
import TextNode from "./Components/TextNode";
import { useCallback, useState } from "react";
import Toast from "./Components/CustomSnackbar";

const nodeTypes = {
  textNode: TextNode,
};

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = { ...connection, id: `${edges.length}+1` };
      setEdges((prevEdges) => addEdge(edge, prevEdges));
    },
    [edges]
  );

  const onNodeClick = useCallback((_, node: Node) => {
    setSelectedNode(node);
    setInputValue(node.data.text);
  }, []);

  const handleSaveChanges = () => {
    if (
      nodes.some(
        (node) =>
          !edges.find(
            (edge) => edge.source === node.id || edge.target === node.id
          )
      )
    ) {
      setOpenSnackbar(true);
      return;
    }

    if (selectedNode) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNode.id
            ? { ...node, data: { ...node.data, text: inputValue } }
            : node
        )
      );
      setSelectedNode(null);
    }
  };

  const createNode = () => {
    const maxY = nodes.reduce(
      (maxY, node) => Math.max(maxY, node.position.y),
      0
    );
    const newNodePosition = {
      x: Math.random() * 500,
      y: maxY + 100,
    };
    const newNode = {
      id: `${nodes.length + 1}`,
      data: { text: 'textNode'},
      position: newNodePosition,
      type: "textNode",
    };
    setNodes((nds) => nds.concat(newNode));
  };
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };
  return (
    <Stack>
      <Stack sx={{ backgroundColor: "#F3F3F3", height: "60px", width: "100%" }}>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          sx={{ height: "40px", mx: 6, my: 1 }}
        >
          <Button
            type="submit"
            color="primary"
            sx={{
              width: "200px",
              borderRadius: 2,
              fontSize: {
                xl: "18px",
                lg: "18px",
                md: "18px",
              },
              border: "1px solid",
              "&:active": {
                boxShadow: "#1976D2",
              },
            }}
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        </Stack>
      </Stack>
      <Stack
        sx={{
          width: "100%",
          height: "100vh",
          flexDirection: "row",
        }}
      >
        <Stack
          sx={{
            width: "80%",
            height: "100%",
          }}
        >
          <ReactFlow
            style={{ width: "100%", height: "100%" }}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
          />
        </Stack>
        <Divider orientation="vertical" flexItem sx={{ borderLeftWidth: 2 }} />
        <Stack
          sx={{
            width: "20%",
            height: "100%",
          }}
        >
          {selectedNode ? (
            <Stack>
              <Stack>
                <Divider sx={{ borderBottomWidth: 2 }} />
                <Stack
                  sx={{
                    flexDirection: "row",
                    alignItems: "center",
                    height: "50px",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <ArrowBackIcon
                    fontSize="small"
                    sx={{ position: "absolute", left: 0, ml: 2 }}
                    onClick={() => {
                      setSelectedNode(null);
                    }}
                  />
                  <Typography>Message</Typography>
                </Stack>
                <Divider sx={{ borderTopWidth: 2 }} />
              </Stack>
              <Stack
                sx={{ height: "120px", width: "95%", gap: 2, my: 2, mx: 1 }}
              >
                <Typography sx={{ color: "gray" }}>Text</Typography>
                <TextareaAutosize
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  style={{
                    width: "100%",
                    height: "10%",
                    padding: "8px",
                  }}
                />
              </Stack>
              <Divider sx={{ borderTopWidth: 2 }} />
            </Stack>
          ) : (
            <Messagebox onCreateNode={createNode} />
          )}
        </Stack>
      </Stack>
      <Toast
        open={openSnackbar}
        onClose={handleSnackbarClose}
        message="Cannot save Flow"
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </Stack>
  );
}

export default App;
