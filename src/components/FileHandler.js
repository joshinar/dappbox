import React, { useEffect, useRef, useState } from 'react';
import { create } from 'ipfs-http-client';
const projectId = process.env.REACT_APP_PROJECT_ID;
const projectSecret = process.env.REACT_APP_PROJECT_SECRET;
// const auth =
//   'Bearer ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const FileHandler = ({ dappbox, setUploaded, provider, setLoading }) => {
  const [file, setFile] = useState(null);
  const [fileInfo, setFileInfo] = useState({ size: 0, type: '', name: '' });
  const [description, setDescription] = useState(null);
  const inputRef = useRef();
  const uploadFile = async () => {
    if (!description) {
      alert('Please add a description');
      return;
    }
    setLoading(true);
    try {
      const signer = await provider.getSigner();
      const client = await create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        apiPath: '/api/v0',
        headers: {
          authorization: 'Basic ' + btoa(projectId + ':' + projectSecret),
        },
      });
      const cid = await client.add(file);
      const transaction = await dappbox
        .connect(signer)
        .uploadFile(
          cid.path,
          fileInfo.size,
          fileInfo.type,
          fileInfo.name,
          description
        );
      await transaction.wait();
      setUploaded(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div
      style={{
        margin: '10px auto',
        padding: '10px',
        border: '2px solid #ccc',
        borderRadius: '10px',
        width: '30%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-2px 2px 20px #53cec3',
      }}
    >
      <input
        hidden
        type='file'
        ref={inputRef}
        onChange={async (e) => {
          let image = e.currentTarget.files[0];
          const buffer = await image.arrayBuffer();
          let byteArray = new Int8Array(buffer);
          console.log(byteArray);
          setFile(byteArray);
          setFileInfo({
            type: e.target.files[0].type,
            size: e.target.files[0].size,
            name: e.target.files[0].name,
          });
        }}
      />
      <textarea
        placeholder='Enter description'
        rows={5}
        style={{ outline: 'none' }}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button
        onClick={() => inputRef.current && inputRef.current.click()}
        style={{
          background: 'teal',
          color: '#fff',
          fontWeight: 'bolder',
          fontSize: '16px',
          padding: '10px',
          border: 'none',
          borderRadius: '10px',
          outline: 'none',
          margin: '5px 0',
          cursor: 'pointer',
        }}
      >
        Select file
      </button>
      <h5>Selected File :{fileInfo.name}</h5>
      <button
        onClick={() => uploadFile()}
        style={{
          background: 'teal',
          color: '#fff',
          fontWeight: 'bolder',
          fontSize: '16px',
          padding: '10px',
          border: 'none',
          borderRadius: '10px',
          outline: 'none',
          cursor: 'pointer',
          marginTop: 5,
        }}
      >
        Upload
      </button>
    </div>
  );
};

export default FileHandler;
