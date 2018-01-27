import { connect } from 'react-redux';
import AddTimer from './AddTimer';
import {
  addTimer,
  changeNewTimerDescription,
  changeNewTimerDuration,
} from './actions';

const mapStateToProps = ({ newTimerDescription, newTimerDuration }) => ({
  newTimerDescription,
  newTimerDuration,
});
const mapDispatchToProps = dispatch => ({
  onAddTimerClick: ({ description, duration }) => {
    dispatch(addTimer({ description, duration }));
  },
  changeDescription: newDescription => {
    dispatch(changeNewTimerDescription(newDescription));
  },
  changeDuration: newDuration => {
    dispatch(changeNewTimerDuration(newDuration));
  },
});
const AddTimerContainer = connect(mapStateToProps, mapDispatchToProps)(
  AddTimer,
);

export default AddTimerContainer;
