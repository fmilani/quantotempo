import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { withStyles } from 'material-ui/styles';
import Input from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import AlarmAdd from 'material-ui-icons/AlarmAdd';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  inputField: {
    margin: theme.spacing.unit,
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
  }

  render() {
    const { classes } = this.props;
    return (
      <form>
        <div className={classes.inputField}>
          <Input
            value={this.props.newTimerDuration}
            inputComponent={TimerFormat}
            fullWidth
            style={{
              margin: '10px 0',
            }}
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
            style={{
              margin: '10px 0',
            }}
            onChange={e => {
              this.props.changeDescription(e.target.value);
            }}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                this.submitNewTimer();
              }
            }}
          />
        </div>

        <Button
          color="secondary"
          className={classes.button}
          style={{
            height: 70,
            margin: '10px 0',
          }}
          raised
          fullWidth
          onClick={e => {
            e.preventDefault();
            this.submitNewTimer();
          }}
        >
          <AlarmAdd className={classes.leftIcon} />
          Add timer
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(AddTimer);
