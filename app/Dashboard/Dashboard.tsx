import { AppLayout } from '@/components'
import { DefaultScreen, WalkLogPreset } from './components'
import { useState } from 'react'
import { Space, Segmented } from 'antd'
import styles from './Dashboard.module.scss'

export const Dashboard: React.FC = () => {
  const [advancedOption, setAdvancedOption] = useState<string>('Default');

  return (
    <AppLayout>
      <Space.Compact className={styles.advancedOptionContainer}>
          <Segmented
            options={[
              'Default',
              'Advanced Preset Options'
            ]}
            size='large'
            value={advancedOption}
            onChange={setAdvancedOption}
          />
      </Space.Compact>
      {advancedOption === 'Default' ? <DefaultScreen/> : <WalkLogPreset/>}
    </AppLayout>
  )
}

