import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 text-black">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Poolapack</a>
      </div>
      <div className="flex-none">
        <div className="menu menu-horizontal px-1 flex gap-3">
          <Link href="/">Beranda</Link>
          <Link href="/form">Daftar Form</Link>
        </div>
      </div>
    </div>
  );
}
