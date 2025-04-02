import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
  Position
} from "reactflow";
import axios from "axios";
import "reactflow/dist/style.css";
import { useState, useCallback, useEffect } from "react";
import CustomNode from "./CustomNode";
import ControlsPanel from "./ControlsPanel";
import NodeModal from "./NodeModal";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const nodeTypes = {
  custom: CustomNode,
};

const FlowChart = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [nodeCount, setNodeCount] = useState(0);
  const [selectedNodeType, setSelectedNodeType] = useState("Lead-Source");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [editingNode, setEditingNode] = useState(null);
  const [viewportKey, setViewportKey] = useState(0);
  const { token } = useAuth();
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Callback to handle node changes
  const onNodesChange = useCallback(
    (changes) => {
      // Filter out any position changes
      const filteredChanges = changes.filter(change => change.type !== 'position');
      setNodes((nds) => applyNodeChanges(filteredChanges, nds));
    },
    []
  );

  // Function to get node type
  const getNodeType = (node) => {
    return node.data.label.split("\n")[0];
  };

  // Function to check if adding a node would violate adjacency rules
  const wouldViolateAdjacencyRules = (newNodeType) => {
    if (nodes.length === 0) return false;
    
    const lastNode = nodes[nodes.length - 1];
    const lastNodeType = getNodeType(lastNode);
    
    // Check if trying to add same type node adjacent to last node
    if (newNodeType === lastNodeType) {
      return true;
    }
    
    return false;
  };

  // Handle the addition of a new node
  const handleAddNode = () => {
    if (selectedNodeType) {
      // First node must be Lead Source
      if (nodes.length === 0 && selectedNodeType !== "Lead-Source") {
        alert("The first node must be a Lead Source.");
        return;
      }

      // Check adjacency rules
      if (wouldViolateAdjacencyRules(selectedNodeType)) {
        alert(`Cannot add ${selectedNodeType} node adjacent to another ${selectedNodeType} node.`);
        return;
      }

      setModalContent(selectedNodeType);
      setIsOpen(true);
      setEditingNode(null);
    } else {
      alert("Please select a valid node type.");
    }
  };

  // Handle form submission for adding/updating nodes
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const subject = formData.get("subject");
    const text = formData.get("content");
    const delay = formData.get("delay");
    const email = formData.get("email");
    let nodeContent = "";

    if (modalContent === "Cold-Email") {
      nodeContent = `- (${subject}) ${text}`;
    } else if (modalContent === "Wait/Delay") {
      nodeContent = `- (${delay})`;
    } else {
      nodeContent = `- (${email})`;
    }

    // Update the existing node if editing, otherwise add a new node
    if (editingNode) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === editingNode.id
            ? { ...node, data: { label: `${modalContent}\n${nodeContent}` } }
            : node
        )
      );
    } else {
      if (selectedNodeType === "Lead-Source") {
        setSelectedNodeType("Cold-Email");
      }
      addNode(modalContent, nodeContent);
    }
    setIsOpen(false);
  };

  // Handle node click to open modal for editing
  const handleNodeClick = (event, node) => {
    setModalContent(node.data.label.split("\n")[0]);
    setIsOpen(true);
    setEditingNode(node);
  };

  // Handle the process start
  const handleStartProcess = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/sequence/start-process`,
      {
        nodes,
        edges,
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    if (response.status === 200) {
      alert("Process started successfully");
    } else {
      alert("Error starting process");
    }
  };

  // Callback to handle edge changes
  const onEdgesChange = useCallback(
    (changes) => {
      // Filter out changes that would violate adjacency rules
      const filteredChanges = changes.filter(change => {
        if (change.type === 'add') {
          const sourceNode = nodes.find(n => n.id === change.item.source);
          const targetNode = nodes.find(n => n.id === change.item.target);
          
          if (sourceNode && targetNode) {
            const sourceType = getNodeType(sourceNode);
            const targetType = getNodeType(targetNode);
            
            // Check if connecting same type nodes
            if (sourceType === targetType) {
              return false;
            }
          }
        }
        return true;
      });
      
      setEdges((eds) => applyEdgeChanges(filteredChanges, eds));
    },
    [nodes]
  );

  // Add event listeners for node actions
  useEffect(() => {
    const handleNodeEdit = (event) => {
      const node = event.detail;
      setModalContent(node.data.label.split("\n")[0]);
      setIsOpen(true);
      setEditingNode(node);
    };

    const handleNodeDelete = (event) => {
      const nodeId = event.detail;
      handleDeleteNode(nodeId);
    };

    window.addEventListener('nodeEdit', handleNodeEdit);
    window.addEventListener('nodeDelete', handleNodeDelete);

    return () => {
      window.removeEventListener('nodeEdit', handleNodeEdit);
      window.removeEventListener('nodeDelete', handleNodeDelete);
    };
  }, [nodes, edges]);

  // Modify the addNode function to use the custom node type
  const addNode = (label, content) => {
    const newNodeId = (nodeCount + 1).toString();
    const newNode = {
      id: newNodeId,
      type: 'custom',
      data: { label: `${label}\n${content}` },
      position: { x: window.innerWidth / 2 - 175, y: nodeCount * 250 },
      draggable: false,
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
      style: { width: 350, padding: '20px' }
    };
    setNodes((nds) => nds.concat(newNode));
    setNodeCount((count) => count + 1);

    // Only create edge if there are existing nodes
    if (nodes.length > 0) {
      const newEdge = {
        id: `${nodeCount}-${newNodeId}`,
        source: `${nodeCount}`,
        target: newNodeId,
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#94a3b8', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' }
      };
      setEdges((eds) => eds.concat(newEdge));
    }
    
    // Trigger a re-fit of the viewport
    setViewportKey(prev => prev + 1);
  };

  // Function to check if there are any Cold Email nodes
  const hasColdEmailNode = () => {
    return nodes.some(node => node.data.label.startsWith("Cold-Email"));
  };

  // Function to delete a node
  const handleDeleteNode = (nodeId) => {
    // Find the node to be deleted
    const nodeToDelete = nodes.find(node => node.id === nodeId);
    if (!nodeToDelete) return;

    // Prevent deletion of the first node (Lead Source)
    if (nodeToDelete.id === "1") {
      alert("Cannot delete the first Lead Source node.");
      return;
    }

    // Find all edges connected to this node
    const connectedEdges = edges.filter(edge => 
      edge.source === nodeId || edge.target === nodeId
    );

    // Find the source and target nodes of the deleted node
    const sourceNode = nodes.find(node => 
      connectedEdges.some(edge => edge.source === node.id && edge.target === nodeId)
    );
    const targetNode = nodes.find(node => 
      connectedEdges.some(edge => edge.source === nodeId && edge.target === node.id)
    );

    // If we have both source and target nodes, check if they can be connected
    if (sourceNode && targetNode) {
      const sourceType = getNodeType(sourceNode);
      const targetType = getNodeType(targetNode);

      // Check if connecting these nodes would violate adjacency rules
      if (sourceType === targetType) {
        alert("Cannot delete this node as it would create an invalid connection between same-type nodes.");
        return;
      }
    }

    // Remove the node
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    
    // Remove edges connected to the deleted node
    setEdges((eds) => eds.filter((edge) => 
      edge.source !== nodeId && edge.target !== nodeId
    ));

    // If we have both source and target nodes, create a new edge between them
    if (sourceNode && targetNode) {
      const newEdge = {
        id: `${sourceNode.id}-${targetNode.id}`,
        source: sourceNode.id,
        target: targetNode.id,
      };
      setEdges((eds) => eds.concat(newEdge));
    }
  };

  // Handle node right click for delete option
  const handleNodeContextMenu = (event, node) => {
    event.preventDefault();
    if (window.confirm('Are you sure you want to delete this node?')) {
      handleDeleteNode(node.id);
    }
  };

  return (
    <div className="w-full h-full mt-4 relative">
      <ReactFlow
        key={viewportKey}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        onNodeContextMenu={handleNodeContextMenu}
        nodeTypes={nodeTypes}
        className="rounded-2xl bg-gray-50/80 shadow-xl border border-gray-200"
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#94a3b8', strokeWidth: 2 },
          markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' }
        }}
        fitView
        fitViewOptions={{ 
          padding: 0.2,
          minZoom: 0.5,
          maxZoom: 1.5,
          duration: 400
        }}
      >
        <Controls className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg border border-white/20 p-2" />
      </ReactFlow>
      <ControlsPanel
        selectedNodeType={selectedNodeType}
        setSelectedNodeType={setSelectedNodeType}
        handleAddNode={handleAddNode}
        handleStartProcess={handleStartProcess}
        hasColdEmailNode={hasColdEmailNode}
      />
      <NodeModal
        isOpen={modalIsOpen}
        onClose={() => setIsOpen(false)}
        modalContent={modalContent}
        editingNode={editingNode}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default FlowChart; 