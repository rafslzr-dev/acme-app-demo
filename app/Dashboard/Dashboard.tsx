import { AppLayout } from '@/components'
import styles from './Dashboard.module.scss'
import { Button, Space, Popover } from 'antd';
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from 'next/router';


type InputsTypes = {
  dogCount: number
}

export const Dashboard: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<InputsTypes>()
  const router = useRouter()

  const onSubmit: SubmitHandler<InputsTypes> = (data): void => {
    router.push({pathname: '/walk-log', query: {
      dogCount: data.dogCount
    }})
  }

  return (
    <AppLayout>
      <h2 className={styles.greetings}>Hello! How many dogs did you walk today?</h2>
      <Space.Compact style={{ maxWidth: '520px', width: '100%' }}>
        <Popover
          title="Only accepts 1-15"
          open={!!errors.dogCount}
          placement='bottom'
        >
          <input id="dog-count" type="number" className='input -left-radius' min={1} max={15} {...register('dogCount', { min: 1, max: 15 })}/>
        </Popover>
        <Button type='primary' size='large' onClick={handleSubmit(onSubmit)}>Submit</Button>
      </Space.Compact>
      <p className='input-label'>Max: 15</p>
    </AppLayout>
  )

}

