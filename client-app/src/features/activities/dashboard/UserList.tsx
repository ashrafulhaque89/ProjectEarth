import React, { Fragment } from 'react';
import { Item, Segment, List, Image } from 'semantic-ui-react';
import { IUser } from '../../../app/models/user';
import { Link } from 'react-router-dom';

interface IProps {
  users: IUser[];
}

const UserList: React.FC<IProps> = ({
  users
}) => {
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
              </Item.Content>
            </Item>
          ))}
        </List>
      </Segment>
   
    </Fragment>
  );
};

export default UserList;
