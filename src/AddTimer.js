import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { withStyles } from 'material-ui/styles';
import Input from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import AlarmAdd from 'material-ui-icons/AlarmAdd';
import Modal from 'material-ui/Modal';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  addTimerFab: {
    textAlign: 'center',
    left: '50%',
    transform: 'translate(-50%, 0)',
    position: 'fixed',
    bottom: 2 * theme.spacing.unit,
    zIndex: theme.zIndex.appBar,
  },
  button: {
    margin: `${2 * theme.spacing.unit}px 0`,
  },
  inputField: {
    margin: `${theme.spacing.unit}px 0`,
  },
  modal: {
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    paddingTop: 10,
    textAlign: 'center',
    outline: 'none',
  },
});

class TimerFormat extends Component {
  render() {
    return (
      <NumberFormat
        {...this.props}
        type="tel"
        format="##h ##m ##s"
        style={{
          textAlign: 'center',
        }}
        onFocus={e => {
          // moves the cursor to the end of the input
          e.target.selectionStart = e.target.value.length;
        }}
      />
    );
  }
}

class AddTimer extends Component {
  state = { modalFormOpen: false, newTimerDescription: '' };

  submitNewTimer() {
    const hours = Math.floor(this.props.newTimerDuration / 10000);
    const minutes = Math.floor(
      (this.props.newTimerDuration - hours * 10000) / 100,
    );
    const seconds = this.props.newTimerDuration - hours * 10000 - minutes * 100;
    this.props.onAddTimerClick({
      description: this.props.newTimerDescription,
      duration: (hours * 3600 + minutes * 60 + seconds) * 1000,
    });
    this.props.changeDescription('');
    this.props.changeDuration('000000');
    this.closeModalForm();
  }

  openModalForm = () => {
    this.setState(prevState => ({ modalFormOpen: true }));
  };

  closeModalForm = () => {
    this.setState(prevState => ({ modalFormOpen: false }));
  };

  renderModalForm = () => {
    const { classes } = this.props;
    return (
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={this.state.modalFormOpen}
        onClose={this.closeModalForm}
        disableRestoreFocus
      >
        <Paper className={classes.modal}>
          <Typography gutterBottom type="display2" id="modal-title">
            {this.state.newTimerDescription || 'New Timer'}
          </Typography>
          <form>
            <Input
              value={this.props.newTimerDuration}
              inputComponent={TimerFormat}
              fullWidth
              className={classes.inputField}
              onKeyDown={event => {
                event.preventDefault();
                const pressedKey = event.key;
                if (
                  (pressedKey < '0' || pressedKey > '9') &&
                  pressedKey !== 'Backspace' &&
                  pressedKey !== 'Tab' &&
                  pressedKey !== 'Enter'
                ) {
                  return;
                }
                if (pressedKey === 'Tab' || pressedKey === 'Enter') {
                  this.descriptionField.focus();
                  return;
                }
                let newValue;
                if (pressedKey === 'Backspace') {
                  newValue = '0' + this.props.newTimerDuration.slice(0, -1);
                } else {
                  newValue = this.props.newTimerDuration.slice(1) + pressedKey;
                }
                this.props.changeDuration(newValue);
              }}
            />
            <TextField
              inputProps={{ style: { textAlign: 'center' } }}
              inputRef={node => {
                this.descriptionField = node;
              }}
              value={this.props.newTimerDescription}
              placeholder="Description"
              fullWidth
              className={classes.inputField}
              onChange={e => {
                const newTimerDescription = e.target.value;
                this.props.changeDescription(newTimerDescription);
                this.setState(prevState => ({
                  newTimerDescription,
                }));
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  this.submitNewTimer();
                }
              }}
            />
            <Button
              fullWidth
              raised
              color="secondary"
              className={classes.button}
              onClick={e => {
                e.preventDefault();
                this.submitNewTimer();
              }}
              style={{
                height: 60,
              }}
            >
              Create timer
            </Button>
            <Button
              className={classes.button}
              onClick={e => {
                e.preventDefault();
                this.closeModalForm();
              }}
            >
              Cancel
            </Button>
          </form>
        </Paper>
      </Modal>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.addTimerFab}>
          <Button
            aria-label="Add new timer"
            fab
            color="secondary"
            onClick={e => {
              e.preventDefault();
              this.openModalForm();
            }}
          >
            <AlarmAdd />
          </Button>
        </div>
        {this.renderModalForm()}
      </div>
    );
  }
}

export default withStyles(styles)(AddTimer);
