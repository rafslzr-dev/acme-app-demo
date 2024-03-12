import React, { useEffect, useRef } from "react";
import { Card, Space, Rate,  } from 'antd';
import styles from '@/styles/components/WalkLogForm.module.scss'
import classNames from 'classnames';
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form"

type WalkLogFormInputTypes = {
  dogName: string
  walkDistance: number
  rating: number
  notes: string
}

interface WalkLogFormProps {
  callSubmit: boolean
  setCallSubmit: (value: boolean) => void
  onError: (error: FieldErrors<WalkLogFormInputTypes>) => void
  hasFormErrors: boolean
  setHasFormErrors: (value: boolean) => void
  setData: (data: WalkLogFormInputTypes) => void
}

export const WalkLogForm: React.FC<WalkLogFormProps> = ({
  callSubmit = false,
  hasFormErrors = false,
  setHasFormErrors = () => {},
  setCallSubmit = () => {},
  onError = () => {},
  setData
}) =>  {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitted }
  } = useForm<WalkLogFormInputTypes>()


  const refSubmitButton = useRef<HTMLButtonElement>(null)

  const onSubmit: SubmitHandler<WalkLogFormInputTypes> = (data) => {
    setData(data)
    console.log(data)
    setHasFormErrors(false)
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
      <Card title='Walk Log No: 1'>
        <Space.Compact className={styles.inputContainer}>
          <p className={styles.inputLabel}>Dog Name:</p>
          <input
            type='text'
            placeholder='Dog Name'
            className={classNames('input', !!errors.dogName && '-error')}
            style={{
              maxWidth: '520px'
            }}
            {...register('dogName', { required: true })}
          />
        </Space.Compact>
        <Space.Compact className={styles.inputContainer}>
          <p className={styles.inputLabel}>Walk Distance:</p>
          <input
            type='number'
            placeholder='Distance'
            className={classNames('input')}
            style={{
              maxWidth: '160px'
            }}
            {...register('walkDistance')}
          />
          <p className={styles.inputSuffix}>meters</p>
        </Space.Compact>
        <Space.Compact className={styles.inputContainer}>
          <p className={styles.inputLabel}>Walk Rating:</p>
          <div className={styles.ratingContainer}>
            <Rate defaultValue={3} style={{ margin: 'auto'}}
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
            ></textarea>
        </Space.Compact>
      </Card>
      <button hidden={true} ref={refSubmitButton} type={"submit"} />
    </form>
  </Space>
  )}
