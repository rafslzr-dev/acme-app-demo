import { AppLayout } from '@/components'
import { DefaultScreen, WalkLogPreset } from './components'
import { useState } from 'react'
import { Space, Switch } from 'antd'
import styles from './Dashboard.module.scss'
import classNames from 'classnames'

export const Dashboard: React.FC = () => {
  const [showAdvancedScreen, setShowAdvancedScreen] = useState(false)

  return (
    <AppLayout>
      <Space.Compact className={styles.advancedOptionContainer}>
        <h3 className={classNames(styles.advancedOptionLabel, showAdvancedScreen && styles.advancedOptionLabelActive)}>
          Show Advanced Preset Options
        </h3>
        <Switch
          onChange={() => setShowAdvancedScreen(!showAdvancedScreen)}
          checked={showAdvancedScreen}
          />
      </Space.Compact>
      {!showAdvancedScreen && <DefaultScreen/>}
      {showAdvancedScreen && <WalkLogPreset/>}
    </AppLayout>
  )
}

