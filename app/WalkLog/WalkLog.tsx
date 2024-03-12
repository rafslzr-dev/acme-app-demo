import { AppLayout } from '@/components'
import styles from './WalkLog.module.scss'
import { WalkLogForm, WalkLogFormInputTypes } from '@/components'
import { Button } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface FormDataTypes {
  [key: string]: WalkLogFormInputTypes
}

interface WalkLogProps {
  generateFormCount: number
}

export const WalkLog: React.FC<WalkLogProps> = ({
  generateFormCount = 1
}) => {
  const [callSubmit, setCallSubmit] = useState(false)
  const [hasFormErrors, setHasFormErrors] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const [formIds, setFormIds] = useState<(keyof FormDataTypes)[]>([])
  const [formData, setFormData] = useState<FormDataTypes>({})

  // Initialize form based on count
  useEffect(() => {
    const generatedFormIds = Array.from({length: generateFormCount}).map(() => uuidv4())
    setFormIds(generatedFormIds)
  }, [])

  useEffect(() => {
    if(!callSubmit && !hasFormErrors && isFormValid) {
      alert('success!')
    }
  }, [hasFormErrors, callSubmit, isFormValid])

  const addForm = (): void => setFormIds([...formIds, uuidv4()])

  return (
    <AppLayout>
      <h2 className={styles.greetings}>Log your walks here:</h2>
      {formIds.map((id, index) =>
          <WalkLogForm
            key={id}
            formTitle={`Walk Log #${index + 1}`}
            callSubmit={callSubmit}
            onDelete={() => {
              setFormIds(formIds.filter((currentId) => currentId !== id))
            }}
            onError={(errors) => {
              setFormData([])
              setCallSubmit(false)
              setHasFormErrors(!!errors)
            }}
            setData={(data) => {
              console.log(data)
              setFormData({
                ...formData,
                [id]: data
              })
              if(formIds.length === index + 1) {
                setCallSubmit(false)
                setIsFormValid(true)
              }
              setHasFormErrors(false)
            }}
          />
      )}

      <Button type="dashed"
        size='large'
        block
        icon={<PlusCircleOutlined />}
        style={{
          fontWeight: 'bold'
        }}
        onClick={() => {
          addForm()
        }}
        >
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
        }}>
        Submit
      </Button>
    </AppLayout>
  )}

