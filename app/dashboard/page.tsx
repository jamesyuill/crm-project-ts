import ProjectList from '@/components/ProjectList';
import React from 'react';

export default async function Dashboard() {
  let projectTypes = [];

  const res = await fetch(process.env.NEXTAUTH_URL + '/api/getAllSublists', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });
  projectTypes = await res.json();

  return (
    <div className="mt-3">
      <ProjectList projectTypes={projectTypes} />
    </div>
  );
}
