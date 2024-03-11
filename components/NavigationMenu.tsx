import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {  MailOutlined,} from "@ant-design/icons"
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

const items: MenuProps['items'] = [
  {
    label: 'Navigation One',
    key: 'mail',
    icon: <MailOutlined />,
  },
];

export const NavigationMenu = (): JSX.Element => (<Menu  mode="horizontal" items={items} />)