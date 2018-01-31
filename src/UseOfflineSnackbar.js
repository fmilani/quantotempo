import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';

const UseOfflineSnackbar = props => (
  <Snackbar
    message="The app is ready to use offline!"
    open={props.open}
    action={[
      <Button key="undo" color="secondary" dense onClick={() => {}}>
        Dismiss
      </Button>,
    ]}
  />
);

export default UseOfflineSnackbar;
