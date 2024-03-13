import { AppLayout } from '@/components'
import { DefaultScreen } from './components/DefaultScreen'
import { useState } from 'react'

export const Dashboard: React.FC = () => {
  const [showAdvancedScreen, ] = useState(false)
  return (
    <AppLayout>
      {!showAdvancedScreen && <DefaultScreen/>}
    </AppLayout>
  )

}

