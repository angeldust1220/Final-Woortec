"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleNavigation = (path) => {
    router.push(path);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const clearCookie = (name) => {
    const domain = window.location.hostname;
    const path = "/";
    // Clear cookie with the specified domain and path
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path};domain=${domain};`;
    // Clear cookie with just the specified path
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path};`;
    // Clear cookie without specifying domain and path
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
  };

  const handleLogout = async () => {
    const cookies = [
      "sb-uvhvgcrczfdfvoujarga-auth-token-code-verifier",
      "sb-uvhvgcrczfdfvoujarga-auth-token",
    ];
    cookies.forEach((cookie) => clearCookie(cookie)); // Clear each specific cookie
    await router.push("/login");
    window.location.reload();
  };

  return (
    <div style={styles.sidebarContainer}>
      <div style={styles.header}>Wortec</div>
      <ul style={styles.list}>
        <li style={styles.listItem} onClick={() => handleNavigation("/dashboard")}>Dashboard</li>
        <li style={styles.listItem} onClick={() => handleNavigation("/connections")}>Connections</li>
        <li style={styles.listItem} onClick={handleClick}>
          Strategies {open ? "▲" : "▼"}
        </li>
        {open && (
          <ul style={styles.subList}>
            <li style={styles.subListItem} onClick={() => handleNavigation("/services/expresslaunching")}>Express Launching</li>
            <li style={styles.subListItem} onClick={() => handleNavigation("/services/launching")}>Launching</li>
            <li style={styles.subListItem} onClick={() => handleNavigation("/services/analysis")}>Analysis</li>
            <li style={styles.subListItem} onClick={() => handleNavigation("/services/optimization")}>Optimization</li>
          </ul>
        )}
      </ul>
      <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
    </div>
  );
};

const styles = {
  sidebarContainer: {
    width: '240px',
    height: '100vh',
    backgroundColor: '#00BFA6',
    color: '#ffffff',
    overflowY: 'auto',
    boxSizing: 'border-box',
    padding: '20px',
  },
  header: {
    fontSize: '18px',
    textAlign: 'center',
    borderBottom: '1px solid #ffffff',
    paddingBottom: '10px',
    marginBottom: '20px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    padding: '10px 0',
    cursor: 'pointer',
  },
  subList: {
    listStyleType: 'none',
    padding: 0,
    paddingLeft: '20px',
  },
  subListItem: {
    padding: '5px 0',
    cursor: 'pointer',
  },
  logoutButton: {
    marginTop: '20px',
    color: '#ffffff',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default Sidebar;
