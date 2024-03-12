import { AppLayout } from '@/components'
import styles from './WalkLog.module.scss'
import { WalkLogForm } from '@/components'
import { Button } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'

export const WalkLog: React.FC = () => (
    <AppLayout>
      <h2 className={styles.greetings}>Log your walks here:</h2>
      <WalkLogForm/>
      <WalkLogForm/>
      <WalkLogForm/>
      <Button type="dashed"
        size='large'
        block
        icon={<PlusCircleOutlined />}
        style={{
          fontWeight: 'bold'
        }}>

        ADD ADDITIONAL LOG FORM
      </Button>

      <Button type="primary"
        size='large'
        block
        style={{
          fontWeight: 'bold',
          marginTop: '24px'
        }}>
        Submit
      </Button>
    </AppLayout>
  )

