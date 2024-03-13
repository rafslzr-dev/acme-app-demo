import React from "react";
import { Card, Space, Rate, Popover } from 'antd';
import styles from '@/styles/components/WalkLogForm.module.scss'
import classNames from 'classnames';
import { useForm } from "react-hook-form"

type WalkLogFormInputTypes = {
  dogName: string
  walkDistance: number
  rating: number
  notes: string
}

export const WalkLogPreset: React.FC = () =>  {
  const {
    register,
    setValue,
    formState: { errors }
  } = useForm<WalkLogFormInputTypes>({
    defaultValues: {
      dogName: 'Oreo',
      walkDistance: 200,
      rating: 3,
      notes: ''
    }
  })

  return (
  <Space direction="vertical" className={styles.container} >
    <form >
      <Card >
        <Space.Compact className={styles.inputContainer}>
          <p className={styles.inputLabel}>Dog Name:</p>
          <Popover
            title="This field is required"
            open={!!errors.dogName}
            placement='right'
            trigger='focus'
          >
            <input
              type='text'
              placeholder='Dog Name'
              className={classNames('input', !!errors.dogName && '-error')}
              style={{
                maxWidth: '520px'
              }}
              {...register('dogName', { required: true })}
            />
          </Popover>
        </Space.Compact>
        <Space.Compact className={styles.inputContainer}>
          <p className={styles.inputLabel}>Walk Distance:</p>
          <Popover
            title="This field is required"
            open={!!errors.walkDistance}
            placement='right'
            trigger='focus'
          >
            <input
              type='number'
              placeholder='Distance'
              className={classNames('input')}
              style={{
                maxWidth: '160px'
              }}
              {...register('walkDistance')}
            />
          </Popover>
          <p className={styles.inputSuffix}>meters</p>
        </Space.Compact>
        <Space.Compact className={styles.inputContainer}>
          <p className={styles.inputLabel}>Walk Rating:</p>
          <div className={styles.ratingContainer}>
            <Rate
              defaultValue={3}
              style={{ margin: 'auto'}}
              allowClear={false}
              onChange={(value) => {
              setValue('rating', value)
            }}/>
          </div>
        </Space.Compact>
        <Space.Compact >
          <p className={styles.inputLabel}>Notes:</p>
          <textarea
            className={classNames('input -textarea')}
            cols={64}
            placeholder="Notes about the dog's preference and affinities"
            {...register('notes')}
            ></textarea>
        </Space.Compact>
      </Card>
      <button hidden={true} type="submit" />
    </form>
  </Space>
  )}
