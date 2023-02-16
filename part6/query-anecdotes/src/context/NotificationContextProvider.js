import {createContext, useContext, useReducer} from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'EMPTY':
      return null
    default:
      return state
  }
}

export const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, dispatchNotification] = useReducer(notificationReducer, null);

  return (
    <NotificationContext.Provider value={[notification, dispatchNotification]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

let timeoutId = null;
export const useSetNotification = () => {
  const context = useContext(NotificationContext)
  const dispatchNotification = context[1]

  return (message) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }

    dispatchNotification({type: 'SET', payload: message});
    timeoutId = setTimeout(() => {
      dispatchNotification({type: 'EMPTY'})
    }, 5000)
  }
}

export const useNotification = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0];
}

export default NotificationContext