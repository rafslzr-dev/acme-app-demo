import { AppLayout } from '@/components'
import styles from './WalkLog.module.scss'
import { WalkLogForm } from '@/components'
import { Button, message } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useEffect  } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/router'
import { useLogReducer } from './hooks/use-log-reducer'

interface WalkLogProps {
  generateFormCount: number
}


export const WalkLog: React.FC<WalkLogProps> = ({
  generateFormCount = 1
}) => {
  const [state, dispatch] = useLogReducer()

  const router = useRouter()

  const [messageApi, contextHolder] = message.useMessage();

  // Initialize form based on count
  useEffect(() => {
    const generatedFormIds = Array.from({length: generateFormCount}).map(() => uuidv4())
    dispatch({
      type: 'SET_FORM_IDS',
      payload: generatedFormIds
    })
  }, [])

  // A little bit hacky, as we're not dealing with external data.
  // The purpose of this is to showcase multi form instance validations.
  useEffect(() => {
    // When an error occur, formData should be missing some data.
    if(Object.keys(state.formData).length === state.formIds.length && state.formTouched)
      router.push('/log-success')
  }, [state.formData, state.formIds, state.formTouched])

  return (
    <AppLayout>
      <h2 className={styles.greetings}>Log your walks here:</h2>
      {state.formIds.map((id, index) =>
        <WalkLogForm
          key={id}
          formTitle={`Walk Log #${index + 1}`}
          callSubmit={state.callSubmit}
          onDelete={() => {
            dispatch({
              type: 'REMOVE_FORM_ID',
              payload: id
            })
            dispatch({
              type: 'RESET_FORM_DATA',
            })
            dispatch({
              type: 'RESET_FORMS_WITH_ERRORS',
            })
          }}
          onError={() => {
            dispatch({
              type: 'RESET_FORM_DATA',
            })
            dispatch({
              type: 'SET_CALL_SUBMIT',
              payload: false
            })
            dispatch({
              type: 'SET_IS_FORM_VALID',
              payload: false
            })
            dispatch({
              type: 'ADD_FORM_ID_WITH_ERRORS',
              payload: id
            })
            messageApi.open({
              type: 'error',
              content: 'Validation Error. Check your inputs.',
            });
          }}
          setData={(data) => {
            dispatch({
              type: 'ADD_FORM_DATA',
              payload: data,
              id
            })
            dispatch({
              type: 'SET_CALL_SUBMIT',
              payload: false
            })

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
          dispatch({
            type: 'ADD_FORM_ID',
            payload: uuidv4()
          })
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
          dispatch({
            type: 'RESET_FORM_DATA',
          })
          dispatch({
            type: 'RESET_FORMS_WITH_ERRORS',
          })
          dispatch({
            type: 'SET_FORM_TOUCHED'
          })
          dispatch({
            type: 'SET_CALL_SUBMIT',
            payload: true
          })
        }}>
        Submit
      </Button>
      {contextHolder}
    </AppLayout>
  )}

