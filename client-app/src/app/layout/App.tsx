import React, { Fragment,useState, useContext, useEffect } from 'react';
import { Container, Menu } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch
} from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import NotFound from './NotFound';
import {ToastContainer} from 'react-toastify';
import { RootStoreContext } from '../stores/rootStore';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import ProfilePage from '../../features/profiles/ProfilePage';
import PrivateRoute from './PrivateRoute';
import axios from 'axios';
import { IUser } from '../models/user';
import UserList from '../../features/activities/dashboard/UserList';

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const {setAppLoaded, token, appLoaded} = rootStore.commonStore;
  const {getUser} = rootStore.userStore;
  const {getAllUser} = rootStore.userStore;
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (token) {
      getAllUser().finally(() => setAppLoaded())
    } else {
      setAppLoaded();
    }
  }, [getUser, getAllUser, setAppLoaded, token])

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded())
    } else {
      setAppLoaded();
    }
  }, [getUser, getAllUser, setAppLoaded, token])

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

  if (!appLoaded)  return <LoadingComponent content='Loading app...' />

  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position='bottom-right' />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
            <Fragment>
              <Menu vertical size={'large'} style={{ width: '20%', marginTop: 50 }}>
              <UserList users={users}/>
              </Menu>
              </Fragment>
              <Switch>
              <Route exact path='/listuser' component={UserList} />
                <Route exact path='/activities' component={ActivityDashboard} />
                <PrivateRoute path='/activities/:id' component={ActivityDetails} />
                <PrivateRoute
                  key={location.key}
                  path={['/createActivity', '/manage/:id']}
                  component={ActivityForm}
                />
                <PrivateRoute path='/profile/:username' component={ProfilePage} />
                <PrivateRoute component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
