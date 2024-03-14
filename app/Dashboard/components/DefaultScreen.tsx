import { Button, Space, Popover } from 'antd';
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from 'next/router';
import classNames from 'classnames';
import React from 'react';
import styles from '../Dashboard.module.scss'


type InputsTypes = {
  dogCount: number
}

export const DefaultScreen: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<InputsTypes>({
    defaultValues: {
      dogCount: 1
    }
  })
  const router = useRouter()

  const onSubmit: SubmitHandler<InputsTypes> = (data): void => {
    router.push({
      pathname: '/walk-log',
      query: {
        dogCount: data.dogCount
      }
    })
  }

  return <>
    <h2 className={styles.greetings}>Hello! How many dogs did you walk today?</h2>
    <Space.Compact style={{ maxWidth: '520px', width: '100%' }}>
      <Popover
        title="Only accepts 1-10. Field is required"
        open={!!errors.dogCount}
        placement='topLeft'
        trigger='focus'
      >
        <input id="dog-count"
          type="number"
          className={classNames('input -left-radius', !!errors.dogCount && '-error' )}
          min={1}
          max={10}
          {...register('dogCount', { min: 1, max: 10, required: true })}/>
      </Popover>
      <Button type='primary' size='large' onClick={handleSubmit(onSubmit)}>Submit</Button>
    </Space.Compact>
    <p className='input-label'>Max: 10. Required.</p>
  </>
}
