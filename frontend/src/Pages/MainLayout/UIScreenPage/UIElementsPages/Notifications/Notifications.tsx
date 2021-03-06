import React from 'react';
import { NotificationManager } from 'react-notifications';
import { Col, Row } from 'reactstrap';
import Widget from '../../../Widget';
import { Button } from '../../../../../Components/Button';
import { NotificationContext, NotificationContextType } from '../../../../../Components/NotificationContext';

type NotificationType = 'info' | 'success' | 'warning' | 'error';

const Notifications: React.FC = () => {
  const context = React.useContext<NotificationContextType>(NotificationContext);
  const createNotification = (type: NotificationType) => {
    switch (type) {
      case 'info':
        NotificationManager.info('Info message');
        break;
      case 'success':
        NotificationManager.success('Success message', 'Title here');
        break;
      case 'warning':
        NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
        break;
      case 'error':
        NotificationManager.error('Error message', 'Click me!', 5000, () => {
          alert('callback');
        });
        break;
    }
  };
  return (
    <div className='relative'>
      <Widget>
        <Col>
          <Row>
            <Button
              color=''
              style={{ marginRight: '5px' }}
              onClick={() => {
                context?.addNotification!({
                  position: 'top',
                  key: 'key1',
                  open: true,
                  text: `I'm alert`,
                  className: 'position-relative border-0',
                  color: 'primary',
                });
              }}>
              top
            </Button>
            <Button
              color=''
              style={{ marginRight: '5px' }}
              onClick={() => {
                context?.addNotification({
                  position: 'fixed-top',
                  key: 'key2',
                  open: true,
                  text: `I'm alert`,
                  className: '',
                  color: 'danger',
                });
              }}>
              fixed top
            </Button>
            <Button
              color=''
              style={{ marginRight: '5px' }}
              onClick={() => {
                context?.addNotification({
                  position: 'fixed-bottom',
                  key: 'key3',
                  open: true,
                  text: `I'm alert`,
                  className: 'm-0',
                  color: 'danger',
                });
              }}>
              fixed bottom
            </Button>
            <Button
              color=''
              style={{ marginRight: '5px' }}
              onClick={() => {
                context?.addNotification({
                  position: 'fixed-bottom',
                  key: 'key4',
                  open: true,
                  text: `I'm alert`,
                  className: 'w-auto m-3',
                  color: 'danger',
                });
              }}>
              fixed bottom padding
            </Button>
            <Button
              color=''
              style={{ marginRight: '5px' }}
              onClick={() => {
                createNotification('success');
              }}>
              at right corner
            </Button>
            <Button
              color=''
              style={{ marginRight: '5px' }}
              onClick={() => {
                createNotification('warning');
              }}>
              at right corner with other colors
            </Button>
          </Row>
        </Col>
      </Widget>
    </div>
  );
};

export default Notifications;
