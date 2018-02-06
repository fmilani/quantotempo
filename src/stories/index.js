import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import { MemoryRouter } from 'react-router-dom';
import TimerSummary from '../TimerSummary';

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
));

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ));

storiesOf('TimerSummary', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('without timer running', () => (
    <TimerSummary
      description="Timer without timer running"
      duration={3600000 + 54 * 60 * 1000 + 31 * 1000}
    />
  ))
  .add('with timer running', () => (
    <TimerSummary
      description="Timer without timer running"
      duration={3600000 + 54 * 60 * 1000 + 31 * 1000}
      timerInterval={1}
    />
  ));
