import {connect} from 'react-redux';

const Notification = ({notification}) => {
  if (!notification) {
    return;
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => ({
  notification: state.notifications,
})

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification