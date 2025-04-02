import React from 'react';
import { Handle, Position } from 'reactflow';

const CustomNode = ({ data, id }) => {
  const handleEdit = (event) => {
    event.stopPropagation();
    const node = { id, data };
    window.dispatchEvent(new CustomEvent('nodeEdit', { detail: node }));
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    if (window.confirm('Are you sure you want to delete this node?')) {
      window.dispatchEvent(new CustomEvent('nodeDelete', { detail: id }));
    }
  };

  const getNodeColor = (type) => {
    switch (type) {
      case 'Lead-Source':
        return 'from-blue-500 to-blue-600';
      case 'Cold-Email':
        return 'from-purple-500 to-purple-600';
      case 'Wait/Delay':
        return 'from-orange-500 to-orange-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case 'Lead-Source':
        return 'border-blue-200';
      case 'Cold-Email':
        return 'border-purple-200';
      case 'Wait/Delay':
        return 'border-orange-200';
      default:
        return 'border-gray-200';
    }
  };

  const nodeType = data.label.split('\n')[0];
  const nodeContent = data.label.split('\n')[1];

  return (
    <div className="relative group">
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-4 h-4 !bg-white border-2 border-gray-300 hover:border-blue-500 transition-colors duration-200" 
      />
      <div className={`px-5 py-4 shadow-xl rounded-2xl border-2 ${getBorderColor(nodeType)} bg-white/95 backdrop-blur-sm hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 min-w-[250px]`}>
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <div className={`px-4 py-1.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${getNodeColor(nodeType)} shadow-lg transform transition-transform duration-200 hover:scale-105`}>
            {nodeType}
          </div>
        </div>
        <div className="mt-3">
          <div className="text-sm text-gray-600 bg-gray-50/80 backdrop-blur-sm p-3 rounded-xl border border-gray-100">
            {nodeContent}
          </div>
        </div>
        <div className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-0 translate-x-2">
          <div className="flex gap-1.5 bg-white rounded-full shadow-lg p-1.5 border border-gray-100">
            <button
              onClick={handleEdit}
              className="p-1.5 hover:bg-blue-50 rounded-full transition-all duration-200 hover:scale-110"
              title="Edit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 hover:bg-red-50 rounded-full transition-all duration-200 hover:scale-110"
              title="Delete"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-4 h-4 !bg-white border-2 border-gray-300 hover:border-blue-500 transition-colors duration-200" 
      />
    </div>
  );
};

export default CustomNode; 