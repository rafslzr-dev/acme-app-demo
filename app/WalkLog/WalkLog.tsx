import { AppLayout } from '@/components'
import styles from './WalkLog.module.scss'
import { WalkLogForm, WalkLogFormInputTypes } from '@/components'
import { Button, message } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useEffect, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/router'


interface FormDataTypes {
  [key: string]: WalkLogFormInputTypes
}

interface WalkLogProps {
  generateFormCount: number
}


interface LogStateTypes {
  hasFormErrors: boolean
  callSubmit: boolean
  isFormValid: boolean
  formTouched: boolean
  formIds: (keyof FormDataTypes)[]
  formsWithErrors: (keyof FormDataTypes)[]
  formData: FormDataTypes
}


type LogStateActionsTypes =
  | {
    type: 'SET_HAS_FORM_ERROR',
    payload: boolean
  } | {
    type: 'SET_IS_FORM_VALID',
    payload: boolean
  } | {
    type: 'SET_CALL_SUBMIT',
    payload: boolean
  } | {
    type: 'SET_FORM_IDS',
    payload: (keyof FormDataTypes)[]
  } | {
    type: 'ADD_FORM_ID',
    payload: keyof FormDataTypes
  } | {
    type: 'REMOVE_FORM_ID',
    payload: keyof FormDataTypes
  } | {
    type: 'SET_FORMS_WITH_ERRORS',
    payload: (keyof FormDataTypes)[]
  } | {
    type: 'ADD_FORM_ID_WITH_ERRORS',
    payload: keyof FormDataTypes
  } | {
    type: 'SET_FORM_DATA',
    payload: FormDataTypes
  } | {
    type: 'ADD_FORM_DATA',
    id: string,
    payload: WalkLogFormInputTypes
  } | {
    type: 'RESET_FORM_DATA',
  } | {
    type: 'RESET_FORMS_WITH_ERRORS',
  } | {
    type: 'SET_FORM_TOUCHED',
  }


const logStateReducer = (state: LogStateTypes, action: LogStateActionsTypes): LogStateTypes => {
  switch (action.type) {
    case 'SET_HAS_FORM_ERROR': {
      return { ...state, hasFormErrors: action.payload };
    }
    case 'SET_IS_FORM_VALID': {
      return { ...state, isFormValid: action.payload };
    }
    case 'SET_CALL_SUBMIT': {
      return { ...state, callSubmit: action.payload };
    }
    case 'SET_FORM_IDS': {
      return { ...state, formIds: action.payload };
    }
    case 'ADD_FORM_ID': {
      return { ...state, formIds: [...state.formIds, action.payload] };
    }
    case 'SET_FORMS_WITH_ERRORS': {
      return { ...state, formsWithErrors: action.payload };
    }
    case 'ADD_FORM_ID_WITH_ERRORS': {
      return { ...state, formsWithErrors: [...state.formsWithErrors, action.payload] };
    }
    case 'RESET_FORMS_WITH_ERRORS': {
      return { ...state, formsWithErrors: [] };
    }
    case 'REMOVE_FORM_ID': {
      return { ...state, formIds: state.formIds.filter((currentId) => currentId !== action.payload)  };
    }
    case 'SET_FORM_DATA': {
      return { ...state, formData: action.payload };
    }
    case 'ADD_FORM_DATA': {
      return { ...state, formData: { ...state.formData, [action.id]: action.payload} };
    }
    case 'RESET_FORM_DATA': {
      return { ...state, formData: {} };
    }
    case 'SET_FORM_TOUCHED': {
      return { ...state, formTouched: true };
    }
    default: {
      return state;
    }
  }
}

export const WalkLog: React.FC<WalkLogProps> = ({
  generateFormCount = 1
}) => {
  const [state, dispatch] = useReducer(logStateReducer, {
    callSubmit: false,
    hasFormErrors: false,
    isFormValid: false,
    formIds: [],
    formsWithErrors: [],
    formData: {},
    formTouched: false
  })

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

