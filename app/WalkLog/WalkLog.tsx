import { AppLayout } from '@/components'
import styles from './WalkLog.module.scss'

export const WalkLog: React.FC = () => (
    <AppLayout>
      <h2 className={styles.greetings}>Log your dog walks here:</h2>
    </AppLayout>
  )

