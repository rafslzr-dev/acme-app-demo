import { useReducer, Dispatch } from 'react'
import { WalkLogFormInputTypes } from '@/components'

interface FormDataTypes {
  [key: string]: WalkLogFormInputTypes
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

export const useLogReducer = (): [LogStateTypes, Dispatch<LogStateActionsTypes>] => useReducer(logStateReducer, {
    callSubmit: false,
    hasFormErrors: false,
    isFormValid: false,
    formIds: [],
    formsWithErrors: [],
    formData: {},
    formTouched: false
  })
