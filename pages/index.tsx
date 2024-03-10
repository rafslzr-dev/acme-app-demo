import React from 'react';
import { Button, Space, Input } from 'antd';

const Home = () => (
  <div className="App">
      <Space>
        <div style={{ fontSize: 14 }}>Disable algorithm: </div>
        <Input placeholder="Please Input" />
        <Button type="primary">Submit</Button>
      </Space>
  </div>
);

export default Home;
