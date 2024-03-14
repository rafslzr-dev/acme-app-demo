import { AppLayout } from '@/components'
import { DefaultScreen, WalkLogPreset } from './components'
import { useEffect, useState } from 'react'
import { Space, Segmented } from 'antd'
import styles from './Dashboard.module.scss'
import { useRouter } from 'next/router'
import { useNextQueryParams } from '@/hooks'

export const Dashboard: React.FC = () => {
  const [advancedOption, setAdvancedOption] = useState<string>('Default');
  const router = useRouter()
  const currentOption = useNextQueryParams('advancedOption')

  useEffect(() => {
    setAdvancedOption((currentOption || 'Default').replaceAll('+', ' '))
  }, [])

  useEffect(() => {
    router.replace({ query: { advancedOption } }, undefined, { shallow: true });
  }, [advancedOption])

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

