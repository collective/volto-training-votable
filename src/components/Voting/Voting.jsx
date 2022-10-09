import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
  Button,
  Divider,
  Header,
  Label,
  List,
  Segment,
} from 'semantic-ui-react';

import { getVotes, vote } from '../../actions';

const Voting = () => {
  const votes = useSelector((store) => store.votes);
  const dispatch = useDispatch();
  let location = useLocation();
  const content = useSelector((store) => store.content.data);

  React.useEffect(() => {
    dispatch(getVotes(location.pathname));
  }, [dispatch, location]);

  function handleVoteClick(value) {
    if (location) {
      dispatch(vote(location.pathname, value));
    }
  }

  return votes?.loaded && votes?.can_vote ? ( // is store content available? (votable behavior is optional)
    <Segment className="voting">
      <Header dividing>Conference Talk and Training Selection</Header>
      <List>
        <p>
          <Label.Group size="medium">
            {votes?.has_votes ? (
              <Label color="olive" ribbon>
                Average vote for this{' '}
                {content.type_of_talk?.title.toLowerCase()}:{' '}
                {votes?.average_vote}
                <Label.Detail>( Votes Cast {votes?.total_votes} )</Label.Detail>
              </Label>
            ) : (
              <b>
                There are no votes so far for this{' '}
                {content.type_of_talk?.title.toLowerCase()}.
              </b>
            )}
          </Label.Group>
        </p>

        {votes?.can_vote ? (
          <Divider horizontal section>
            Vote
          </Divider>
        ) : null}
        {votes?.already_voted ? (
          <List.Item>
            <List.Content>
              <List.Header>
                You voted for this {content.type_of_talk?.title}.
              </List.Header>
              <List.Description>
                Please see more interesting talks and vote!
              </List.Description>
            </List.Content>
          </List.Item>
        ) : votes?.can_vote ? (
          <List.Item>
            <Button.Group widths="3">
              <Button color="green" onClick={() => handleVoteClick(1)}>
                Approve
              </Button>
              <Button color="blue" onClick={() => handleVoteClick(0)}>
                Don't know what to expect
              </Button>
              <Button color="orange" onClick={() => handleVoteClick(-1)}>
                Decline
              </Button>
            </Button.Group>
          </List.Item>
        ) : null}
      </List>
    </Segment>
  ) : null;
};
export default Voting;
