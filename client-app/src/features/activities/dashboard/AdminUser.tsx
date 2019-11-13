import React, { Fragment, useContext } from 'react';
import { Item, Segment, List, Image, Button } from 'semantic-ui-react';
import { IUser } from '../../../app/models/user';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../../app/stores/rootStore';

interface IProps {
  users: IUser[];
}

const AdminUser: React.FC<IProps> = ({
  users
}) => {
    const rootStore = useContext(RootStoreContext);
    const { deleteUser } = rootStore.userStore;
  return (
    <Fragment>
      <Segment
        textAlign='center'
        style={{ border: 'none' }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        See what other Users are doing
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {users.map(user => (
            <Item key={user.username} style={{ position: 'relative' }}>
              <Image size='tiny' src={user.image || '/assets/user.png'} />
              <Item.Content verticalAlign='middle'>
                <Item.Header as='h3'>
                <Link to={`/profile/${user.username}`}> {user.displayName}</Link>
                </Item.Header>
                <Button
                    name={user.id} 
                    onClick={e => deleteUser(e, user.id)} 
                    color='red' 
                    floated='right'
                    >
                    Delete User
                </Button>
              </Item.Content>
            </Item>
          ))}
        </List>
      </Segment>
   
    </Fragment>
  );
};

export default AdminUser;
