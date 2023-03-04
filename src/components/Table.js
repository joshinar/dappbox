import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
const Table = ({ dappbox, uploaded, account }) => {
  const [files, setFiles] = useState([]);
  const fetchUserFiles = async () => {
    const files = await dappbox.retriveUserFiles(account);
    setFiles(files);
  };
  useEffect(() => {
    if (account) {
      fetchUserFiles();
    }
  }, [account, uploaded]);
  return (
    <div>
      <table
        style={{
          fontfamily: 'Arial, Helvetica, sans-serif',
          borderCollapse: 'collapse',
          width: '80%',
          margin: '50px auto',
          textAlign: 'center',
        }}
      >
        <thead>
          <tr style={{ background: 'teal', color: '#fff' }}>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>File</th>
          </tr>
        </thead>
        <tbody>
          {files.length > 0 &&
            files.map((file, idx) => (
              <tr>
                <td style={{ border: '1px solid teal', padding: '5px' }}>
                  {idx}
                </td>
                <td style={{ border: '1px solid teal', padding: '5px' }}>
                  {file.fileName}
                </td>
                <td style={{ border: '1px solid teal', padding: '5px' }}>
                  {file.fileType}
                </td>
                <td style={{ border: '1px solid teal', padding: '5px' }}>
                  {file.fileDescription}
                </td>
                <td style={{ border: '1px solid teal' }}>
                  <a
                    href={`https://ipfs.io/ipfs/${file.fileHash}`}
                    target='_blank'
                  >
                    Click to view file
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
