import { AppLayout } from '@/components'
import styles from './WalkLog.module.scss'
import { WalkLogForm } from '@/components'
import { Button } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useState } from 'react'

export const WalkLog: React.FC = () => {
  const [callSubmit, setCallSubmit] = useState(false)
  const [hasFormErrors, setHasFormErrors] = useState(false)
  const [formData, setFormData] = useState({
    form1: undefined,
    form2: undefined,
    form3: undefined,
  })

  return (
    <AppLayout>
      <h2 className={styles.greetings}>Log your walks here:</h2>
      <WalkLogForm
        callSubmit={callSubmit}
        setCallSubmit={setCallSubmit}
        hasFormErrors={hasFormErrors}
        setHasFormErrors={setHasFormErrors}
        onError={() => {
          setFormData({})
          setCallSubmit(false)
          setHasFormErrors(true)
        }}
        setData={(data) => {
          setFormData({
            ...formData,
            form1: data
          })
        }}
      />
      <WalkLogForm
        callSubmit={callSubmit}
        setCallSubmit={setCallSubmit}
        hasFormErrors={hasFormErrors}
        setHasFormErrors={setHasFormErrors}
        onError={() => {
          setFormData({})
          setCallSubmit(false)
          setHasFormErrors(true)
        }}
        setData={(data) => {
          setFormData({
            ...formData,
            form2: data
          })
        }}
      />
      <WalkLogForm
        callSubmit={callSubmit}
        setCallSubmit={setCallSubmit}
        hasFormErrors={hasFormErrors}
        setHasFormErrors={setHasFormErrors}
        onError={() => {
          setFormData({})
          setCallSubmit(false)
          setHasFormErrors(true)
        }}
        setData={(data) => {
          console.log(formData)
          setFormData({
            ...formData,
            form3: data
          })
        }}
      />

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
        }}
        onClick={() => {
          setCallSubmit(true)
        }}
        >
        Submit
      </Button>
    </AppLayout>
  )}

