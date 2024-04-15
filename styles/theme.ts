import { theme } from 'antd';
import type { ThemeConfig } from 'antd';

export const colors = {
  background: { body: '#F9F9F9', card: '#F7F7FC' },
}

const AppTheme: ThemeConfig = {
  "token": {
    "colorPrimary": "#08979c",
    "colorInfo": "#006d75",
    "colorLink": "#1677ff",
    "fontSize": 16,
  },
  "algorithm": theme.defaultAlgorithm
};

// eslint-disable-next-line import/no-default-export
export default AppTheme;
