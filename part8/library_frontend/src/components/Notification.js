import {useEffect, useState} from 'react';

const Notification = ({message}) => {
  console.log(message);
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (message != null && shown === false) {
      setShown(true)
    }

    setTimeout(() => setShown(false), 5000)
  }, [message]) // eslint-disable-line


  if (!shown) {
    return;
  }

  return (
    <div style={{color: 'red'}}>{message}</div>
  );
}

export default Notification;