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
  <div className="w-56 rounded-2xl border border-zinc-700 bg-zinc-950 p-4 text-white shadow-2xl">

    <div className="mb-4">
      <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-600">
        Decision
      </p>
    </div>

    <div className="space-y-3">

      <div>
        <label
          htmlFor={`title-${id}`}
          className="mb-1.5 block text-xs text-zinc-500"
        >
          Title
        </label>

        <input
          type="text"
          id={`title-${id}`}
          value={data.title || ""}
          onChange={(event) =>
            updateNodeData("title", event.target.value)
          }
          className="nodrag w-full rounded-lg border border-zinc-800 bg-black px-3 py-2 text-sm text-white outline-none focus:border-zinc-600"
        />
      </div>

      <div>
        <label
          htmlFor={`description-${id}`}
          className="mb-1.5 block text-xs text-zinc-500"
        >
          Description
        </label>

        <textarea
          id={`description-${id}`}
          value={data.description || ""}
          onChange={(event) =>
            updateNodeData("description", event.target.value)
          }
          rows={3}
          className="nodrag w-full resize-none rounded-lg border border-zinc-800 bg-black px-3 py-2 text-sm text-white outline-none focus:border-zinc-600"
        />
      </div>

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

