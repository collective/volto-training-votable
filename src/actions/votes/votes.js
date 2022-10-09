/**
 * Votable actions.
 * @module actions/votes/votes
 */

import { GET_VOTES } from '../../constants/ActionTypes';

/**
 * Get Votes Information
 * @function getVotes
 * @returns {Object} Votes action.
 */
export function getVotes(url) {
  return {
    type: GET_VOTES,
    request: {
      op: 'get',
      path: `${url}/@votes`,
    },
  };
}
