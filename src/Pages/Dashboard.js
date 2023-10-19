import React from 'react';

export default function Dashboard() {
  const loginSuccess = sessionStorage.getItem('loginSuccess');
  
  if (loginSuccess !== 'true') {
    window.location.href = '/login';
    return (
      <h3>Checking Authority...</h3>
    );
  }

  return (
    <div>Dashboard</div>
  );
}
