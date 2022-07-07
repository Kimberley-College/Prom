import React from 'react';

const ViewFinder = () => (
  <svg
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    style={{
      top: 0,
      left: 0,
      zIndex: 1,
      boxSizing: 'border-box',
      border: '25px solid rgba(0, 0, 0, 0.3)',
      position: 'absolute',
      width: '100%',
      height: '100%',
    }}
  >
    <path
      fill="none"
      d="M13,0 L0,0 L0,13"
      stroke="rgba(255, 0, 0, 0.5)"
      strokeWidth="3"
    />
    <path
      fill="none"
      d="M0,87 L0,100 L13,100"
      stroke="rgba(255, 0, 0, 0.5)"
      strokeWidth="3"
    />
    <path
      fill="none"
      d="M87,100 L100,100 L100,87"
      stroke="rgba(255, 0, 0, 0.5)"
      strokeWidth="3"
    />
    <path
      fill="none"
      d="M100,13 L100,0 87,0"
      stroke="rgba(255, 0, 0, 0.5)"
      strokeWidth="3"
    />
  </svg>
);

export default ViewFinder;
