import React from 'react';
import { Item, Segment } from 'semantic-ui-react';
import { IUser } from '../../../app/models/user';

interface IProps {
  users: IUser[];
}

const UserList: React.FC<IProps> = ({
  users
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {users.map(user => (
          <Item key={user.id}>
            <Item.Content>
              <Item.Header as='a'>{user.displayName}</Item.Header>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default UserList;
