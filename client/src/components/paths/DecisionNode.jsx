import { Handle, Position, useReactFlow } from "@xyflow/react";

export default function DecisionNode({ id, data }) {
  const { setNodes } = useReactFlow();

  function updateNodeData(field, value) {
    setNodes((currentNodes) =>
      currentNodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                [field]: value,
              },
            }
          : node
      )
    );
  }

  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid #333",
        borderRadius: "8px",
        background: "white",
        minWidth: "200px",
      }}
    >
      <div>
        <label htmlFor={`title-${id}`}>Title</label>

        <input
          type="text"
          id={`title-${id}`}
          value={data.title || ""}
          onChange={(event) =>
            updateNodeData("title", event.target.value)
          }
        />
      </div>

      <div>
        <label htmlFor={`description-${id}`}>Description</label>

        <input
          type="text"
          id={`description-${id}`}
          value={data.description || ""}
          onChange={(event) =>
            updateNodeData("description", event.target.value)
          }
        />
      </div>

      <Handle
        type="target"
        position={Position.Top}
      />

      <Handle
        type="source"
        position={Position.Bottom}
      />
    </div>
  );
}

