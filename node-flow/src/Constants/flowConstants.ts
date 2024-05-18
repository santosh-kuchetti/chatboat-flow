import { Edge, Node } from "reactflow";

export const initialNodes: Node[] = [
  {
    id: "1",
    data: { text: "text message1" },
    position: { x: 100, y: 100 },
    type: "textNode",
  },
  {
    id: "2",
    data: { text: "text message2" },
    position: { x: 300, y: 300 },
    type: "textNode",
  },
];

export const initialEdges: Edge[] = [{ id: "1-2", source: "1", target: "2" }];
