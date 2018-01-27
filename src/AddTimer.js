import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AlarmAdd from 'material-ui-icons/AlarmAdd';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
});

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
        <NumberFormat
          type="tel"
          format="##h ##m ##s"
          mask="_"
          value={this.props.newTimerDuration}
          style={{
            textAlign: 'right',
            height: 30,
          }}
          getInputRef={node => (this.durationField = node)}
          onFocus={() => {
            // moves the cursor to the end of the input
            this.durationField.selectionStart = this.durationField.value.length;
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
              event.target.nextElementSibling.focus();
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
        <input
          type="text"
          style={{ height: 30 }}
          value={this.props.newTimerDescription}
          onChange={e => {
            this.props.changeDescription(e.target.value);
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              this.submitNewTimer();
            }
          }}
        />
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
