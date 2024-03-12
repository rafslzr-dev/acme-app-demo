import { AppLayout } from '@/components'
import styles from './WalkLog.module.scss'
import { WalkLogForm } from '@/components'

export const WalkLog: React.FC = () => (
    <AppLayout>
      <h2 className={styles.greetings}>Log your walks here:</h2>
      <WalkLogForm/>
      <WalkLogForm/>
      <WalkLogForm/>
    </AppLayout>
  )

