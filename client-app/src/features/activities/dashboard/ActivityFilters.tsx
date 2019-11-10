import React, { Fragment, useContext } from 'react';
import { Menu, Header, Segment } from 'semantic-ui-react';
import { Calendar } from 'react-widgets';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';

const ActivityFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate } = rootStore.activityStore;
  return (
    <Fragment>
      <Menu vertical size={'large'} style={{ width: '100%', marginTop: 50 }}>
      <Segment
        textAlign='center'
        style={{ border: 'none' }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        Filter Activities by attendence and Dates
      </Segment>
        <Menu.Item
          active={predicate.size === 0}
          onClick={() => setPredicate('all', 'true')}
          color={'blue'}
          name={'all'}
          content={'All Activities'}
        />
        <Menu.Item
          active={predicate.has('isGoing')}
          onClick={() => setPredicate('isGoing', 'true')}
          color={'blue'}
          name={'username'}
          content={"I'm Going"}
        />
        <Menu.Item
          active={predicate.has('isHost')}
          onClick={() => setPredicate('isHost', 'true')}
          color={'blue'}
          name={'host'}
          content={"I'm hosting"}
        />
      </Menu>
      <Header
        icon={'calendar'}
        attached
        color={'teal'}
        content={'Select Date'}
      />
      <Calendar
        onChange={date => setPredicate('startDate', date!)}
        value={predicate.get('startDate') || new Date()}
      />
    </Fragment>
  );
};

export default observer(ActivityFilters);
