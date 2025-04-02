import React from "react";

const ControlsPanel = ({
  selectedNodeType,
  setSelectedNodeType,
  handleAddNode,
  handleStartProcess,
  hasColdEmailNode,
}) => {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#153448] rounded-xl shadow-lg border border-[#1f4d6a] p-3 transform transition-all duration-300 hover:bg-[#1a3e56] z-50 w-fit mx-auto">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-400/20 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-white hidden md:block">Flow Controls</h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative min-w-[160px]">
            <select
              value={selectedNodeType}
              onChange={(e) => setSelectedNodeType(e.target.value)}
              className="w-full bg-[#1f4d6a] border border-[#2a6589] rounded-lg px-3 py-1.5 text-sm text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
            >
              <option value="Lead-Source" className="bg-[#1f4d6a]">Lead Source</option>
              <option value="Cold-Email" className="bg-[#1f4d6a]">Cold Email</option>
              <option value="Wait/Delay" className="bg-[#1f4d6a]">Wait/Delay</option>
            </select>
          </div>

          <button
            onClick={handleAddNode}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-3 py-1.5 flex items-center justify-center gap-1.5 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-blue-500/25 min-w-[100px] text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span>Add Node</span>
          </button>

          <button
            onClick={handleStartProcess}
            disabled={!hasColdEmailNode()}
            className={`rounded-lg px-3 py-1.5 flex items-center justify-center gap-1.5 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg min-w-[120px] text-sm ${
              hasColdEmailNode()
                ? "bg-green-500 hover:bg-green-600 text-white hover:shadow-green-500/25"
                : "bg-[#1f4d6a] text-gray-400 cursor-not-allowed"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            <span>Start Process</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlsPanel; 