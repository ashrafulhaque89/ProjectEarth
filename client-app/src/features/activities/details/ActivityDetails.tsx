import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';

interface IProps {
    activity: IActivity
    setEditMode: (editMode: boolean) => void;
    setselectedActivity: (activity: IActivity | null) => void;
}

const ActivityDetails: React.FC<IProps> = ({activity, setEditMode, setselectedActivity}) => {
    return (
        <Card fluid>
        <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{activity.title}</Card.Header>
          <Card.Meta>
            <span>{activity.date}</span>
          </Card.Meta>
          <Card.Description>
            {activity.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group widths={2}>
                <Button onClick={() => setEditMode(true)} basic color='olive' content='Edit' />
                <Button onClick={() => setselectedActivity(null)} basic color='teal' content='Cancel' />
          </Button.Group>
        </Card.Content>
      </Card>
    )
}

export default ActivityDetails
