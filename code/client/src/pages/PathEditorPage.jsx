import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
} from "@xyflow/react";

import DecisionNode from "../components/paths/DecisionNode";

const API_URL = import.meta.env.VITE_API_URL || "";

const nodeTypes = {
  decision: DecisionNode,
};

export default function PathEditorPage() {
  const { id } = useParams();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [path, setPath] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadPath() {
      try {
        const response = await fetch(`${API_URL}/api/paths/${id}`, {
          credentials: "include",
        });

        if (!response.ok) {
          // FIX: response.ok must be checked before trying to use the response data.
          return setPath(null);
        }

        const data = await response.json();

        const reactFlowNodes = data.nodes.map((dbNode) => ({
          // FIX: dbNode was used below, but the parameter was named dbNodes.
          id: dbNode._id,
          type: dbNode.type || "step",
          position: {
            x: dbNode.position?.x ?? 0,
            y: dbNode.position?.y ?? 0,
          },
          data: {
            title: dbNode.title,
            // FIX: dbNode was undefined because the map parameter was incorrectly named dbNodes.
            description: dbNode.description,
            resources: dbNode.resources || [],
          },
          // FIX: dbNode was undefined here for the same reason.
          parentId: dbNode.parentNode
            ? dbNode.parentNode.toString()
            : undefined,
        }));

        setNodes(reactFlowNodes);
        setEdges(data.edges || []);
        setPath(data.path);
      } catch (error) {
        // FIX: response does not exist inside catch, so response.json() would cause another error.
        console.error(`${API_URL}/api/paths/${id}`, error);
        setMessage("Loading error has occurred");
      } finally {
        setLoading(false);
      }
    }

    loadPath();
  }, [id, setNodes, setEdges]);

  const onConnect = useCallback(
    (connection) => {
      setEdges((prevEdges) => addEdge(connection, prevEdges));
    },
    [setEdges]
  );



//------------------------------------------------------------------------------------
function handleKeyDown(event) {
  if (event.key !== "Delete" && event.key !== "Backspace") {
    return;
  }

  const selectedNodeIds = nodes
    .filter((node) => node.selected)
    .map((node) => node.id);

  setNodes((currentNodes) =>
    currentNodes.filter((node) => !node.selected)
  );

  setEdges((currentEdges) =>
    currentEdges.filter(
      (edge) =>
        !selectedNodeIds.includes(edge.source) &&
        !selectedNodeIds.includes(edge.target)
    )
  );
}

//------------------------------------------------------------------------------------


  function handleAddNode() {
    const newNode = {
      id: `node-${Date.now()}`,
      type: "decision",
      position: {
        x: 100,
        y: 100,
      },
      data: {
        title: "New Decision",
        description: "",
        resources: [],
      },
    };

    setNodes((currentNode) => [...currentNode, newNode]);
  }

  async function handleSave() {
    try {
      setSaving(true);
      setMessage("");

      const response = await fetch(`${API_URL}/api/paths/${id}`, {
        credentials: "include",
        // FIX: The backend route is PUT /api/paths/:id, not POST.
        method: "PUT",
        headers: {
          // FIX: headers must be an object and the Content-Type must be a string.
          "Content-Type": "application/json",
        },
        // FIX: fetch requires the request body to be a string.
        body: JSON.stringify({
          nodes,
          edges,
        }),
      });

      // FIX: response.json() reads the server response.
      // It does not send a response or set a message.
      if (response.ok) {
        setMessage("Successfully saved");
      } else {
        setMessage("Failed to save");
      }
    } catch (error) {
      // FIX: Show failure feedback instead of only returning.
      console.error("Could not be saved", error);
      setMessage("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    // FIX: Text returned from a component must be inside JSX.
    return <div>Loading Path...</div>;
  }

  if (!path) {
    // FIX: Text returned from a component must be inside JSX.
    return <div>Path could not be loaded.</div>;
  }

  return (
    <main>
      <header>
        <h1>{path.title}</h1>
        <p>{path.description}</p>

        <div>
          <button onClick={handleAddNode}>
            Add Node
          </button>

          <button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
        </div>

        {message && <p>{message}</p>}
      </header>

        <div style={{ width: "100%", height: "600px" }}>

        <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onKeyDown={handleKeyDown}
        fitView
        >
            <Background />
            <Controls />
        </ReactFlow>
        </div> 
    </main>
  );
}