import React, { useEffect } from "react";
import { Card, Space, Rate, Popover, Button, message } from 'antd';
import styles from '@/styles/components/WalkLogForm.module.scss'
import classNames from 'classnames';
import { useForm } from "react-hook-form"
import { generatePresetArray } from '../helpers/generate-preset-array'
import { useRouter } from "next/router";
import { separateByCommas } from '@/helpers'

export type LogPresetTypes = {
  dogCount: number
  dogName: string
  walkDistance: string
  rating: number
  notes: string
}

export const WalkLogPreset: React.FC = () =>  {
  const {
    register,
    setValue,
    formState: { errors, isSubmitted, isValid },
    handleSubmit
  } = useForm<LogPresetTypes>({
    defaultValues: {
      dogCount: 1,
      dogName: 'Oreo',
      walkDistance: '200',
      rating: 3,
      notes: ''
    }
  })

  const [messageApi, contextHolder] = message.useMessage()
  const router = useRouter()

  // Check if there's any errors
  useEffect(() => {
    if(!isValid && isSubmitted) {
      messageApi.open({
        type: 'error',
        content: 'Validation Error. Check your inputs.',
      })
    }
  }, [isValid, isSubmitted, messageApi])

  const onSubmit = (data: LogPresetTypes): void => {
    const generatedPreset = generatePresetArray(data)
    messageApi.open({
      type: 'success',
      content: 'Success!',
    })

    router.push({
      pathname: '/walk-log',
      query: {
        dogCount: data.dogCount,
        preset: JSON.stringify(generatedPreset)
      }
    })
  }

  return (
  <>
    <Space direction="vertical" className={styles.container} >
      <h2 className={styles.greetings}>Generate Log Forms Preset</h2>
      <h3>Tips: </h3>
      <ul className='ulist'>
        <li><b>All fields with asterisks (*) are required.</b></li>
        <li><b>Dog Name</b> and <b>Walk Distance</b> can be separated by commas <b>(Name1, Name2...)</b>.</li>
        <li>You can generate multiple forms with different values by comma separations.</li>
        <li>When received separated values that are less than <b>Dog Count</b>, it will generate a filler automatically based on the last value.</li>
        <li><b>Dog Count</b> will be prioritized over the length of the separated names/distance.</li>
      </ul>
      <form >
        <Card >
          <Space.Compact className={styles.inputContainer}>
            <p className={styles.inputLabel}>*Dog Count</p>
            <Popover
              title="This field is required. Only accepts 1-10"
              open={!!errors.dogCount}
              placement='right'
              trigger='focus'
            >
              <input
                type='number'
                placeholder='Distance'
                className={classNames('input', !!errors.dogCount && '-error')}
                style={{
                  maxWidth: '160px'
                }}
                {...register('dogCount', {
                  min: 1,
                  max: 10,
                  required: true
                })}
              />
            </Popover>
          </Space.Compact>
          <Space.Compact className={styles.inputContainer}>
            <p className={styles.inputLabel}>*Dog Name:</p>
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
            <p className={styles.inputLabel}>*Walk Distance:</p>
            <Popover
              title="This field is required. Only accepts valid numeral values and commas"
              open={!!errors.walkDistance}
              placement='right'
              trigger='focus'
            >
              <input
                type='string'
                placeholder='Distance'
                className={classNames('input')}
                style={{
                  maxWidth: '160px'
                }}
                {...register('walkDistance', {
                  required: true,
                  validate: (value) =>
                    separateByCommas(value).reduce<boolean>(
                      (_, val) => /^\d+$/g.test(val),
                      true)
                })}
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
        <Button type="primary"
          onClick={handleSubmit(onSubmit)}
          size='large'
          block
          style={{
            fontWeight: 'bold',
            marginTop: '24px'
          }}
        >
          Submit
        </Button>
      </form>
    </Space>
    {contextHolder}
  </>
  )}
