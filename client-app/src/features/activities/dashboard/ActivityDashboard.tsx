import React, { useContext, useEffect, useState } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import InfiniteScroll from 'react-infinite-scroller';
import ActivityFilters from './ActivityFilters';
import ActivityListItemPlaceholder from './ActivityListItemPlaceholder';
import { IUser } from '../../../app/models/user';
import UserList from './UserList';
import axios from 'axios';

interface IProps {
  users: IUser[];
}

const ActivityDashboard: React.FC<IProps> = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadActivities,
    loadingInitial,
    setPage,
    page,
    totalPages
  } = rootStore.activityStore;
  const [loadingNext, setLoadingNext] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadActivities().then(() => setLoadingNext(false));
  };

  useEffect(() => {
    axios
      .get<IUser[]>('http://localhost:5000/api/listuser')
      .then(response => {
        let users: IUser[] = [];
        response.data.forEach(user => {       
          users.push(user);
        })
        setUsers(users);
      });
  }, []);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  return (
    <Grid>
      <Grid.Column width={10}>
        {loadingInitial && page === 0 ? (
          <ActivityListItemPlaceholder />
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={!loadingNext && page + 1 < totalPages}
            initialLoad={false}
          >
            <ActivityList />
          </InfiniteScroll>
        )}
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityFilters />
         <UserList users={users}/>
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
