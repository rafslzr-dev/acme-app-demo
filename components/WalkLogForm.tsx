import React from "react";
import { Card, Space, Rate,  } from 'antd';
import styles from '@/styles/components/WalkLogForm.module.scss'
import classNames from 'classnames';
import TextArea from "antd/es/input/TextArea";

export const WalkLogForm: React.FC = () =>  (
  <Space direction="vertical" className={styles.container} >
    <Card title='Dog no. 1'>
      <Space.Compact className={styles.inputContainer}>
        <p className={styles.inputLabel}>Dog Name:</p>
        <input
          type='text'
          className={classNames('input')}
          style={{
            maxWidth: '520px'
          }}
        />
      </Space.Compact>
      <Space.Compact className={styles.inputContainer}>
        <p className={styles.inputLabel}>Walk Distance:</p>
        <input
          type='number'
          className={classNames('input')}
          style={{
            maxWidth: '160px'
          }}
        />
        <p className={styles.inputSuffix}>meters</p>
      </Space.Compact>
      <Space.Compact className={styles.inputContainer}>
        <p className={styles.inputLabel}>Walk Rating:</p>
        <div className={styles.ratingContainer}>
          <Rate defaultValue={3}  style={{ margin: 'auto'}}/>
        </div>
      </Space.Compact>
      <Space.Compact >
        <p className={styles.inputLabel}>Notes:</p>
        <textarea className={classNames('input -textarea')}></textarea>
      </Space.Compact>
    </Card>
  </Space>
  )
