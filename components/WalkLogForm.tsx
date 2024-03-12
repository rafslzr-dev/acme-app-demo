import React, { useEffect, useRef } from "react";
import { Card, Space, Rate, Tooltip, Button, Popover } from 'antd';
import styles from '@/styles/components/WalkLogForm.module.scss'
import classNames from 'classnames';
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form"
import { DeleteOutlined } from '@ant-design/icons';

export type WalkLogFormInputTypes = {
  dogName: string
  walkDistance: number
  rating: number
  notes: string
}

interface WalkLogFormProps {
  formTitle?: string
  callSubmit: boolean
  onError: (error: FieldErrors<WalkLogFormInputTypes>) => void
  setData: (data: WalkLogFormInputTypes) => void
  onDelete: () => void

}

export const WalkLogForm: React.FC<WalkLogFormProps> = ({
  formTitle = 'Walk Log',
  callSubmit = false,
  onError = () => {},
  onDelete = () => {},
  setData
}) =>  {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitted }
  } = useForm<WalkLogFormInputTypes>({
    defaultValues: {
      dogName: 'Oreo',
      walkDistance: 200,
      rating: 3,
      notes: ''
    }
  })

  const refSubmitButton = useRef<HTMLButtonElement>(null)

  const onSubmit: SubmitHandler<WalkLogFormInputTypes> = (data) => {
    setData(data)
  }

  useEffect(() => {
    if(callSubmit) {
      refSubmitButton?.current?.click()
    }
  }, [callSubmit])

  useEffect(() => {
    if (isSubmitted && !isValid) {
      onError(errors)
    }
  }, [isSubmitted, isValid])

  return (
  <Space direction="vertical" className={styles.container} >
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card title={formTitle} extra={
            <Tooltip title="Delete Field">
              <Button
                shape="circle"
                icon={<DeleteOutlined />}
                danger
                onClick={onDelete}
                />
            </Tooltip>
        }>
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
      <button hidden={true} ref={refSubmitButton} type="submit" />
    </form>
  </Space>
  )}
