import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Header, Label, List, Segment } from 'semantic-ui-react';

import { getVotes } from '../../actions';

const Voting = () => {
  const votes = useSelector((store) => store.votes);
  const dispatch = useDispatch();
  let location = useLocation();
  const content = useSelector((store) => store.content.data);

  React.useEffect(() => {
    dispatch(getVotes(location.pathname));
  }, [dispatch, location]);

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
      </List>
    </Segment>
  ) : null;
};
export default Voting;
