import VotingButtons from "./VotingButtons";
import WhoAndWhen from "./WhoAndWhen";
import UserLink from "./UserLink";
import When from "./When";
import './Comment.css';

function Comment(props) {
  return (
    <div className="Comment_Box">
      <VotingButtons size={'sm'}
                     postId={props.comment.id}
                     initialTotal={props.comment.votes_sum===null ? 0 : props.comment.votes_sum}
                     initialUserVote={props.comment.user_vote} />
      <div>
        {props.comment.content}
        <WhoAndWhen style={{padding:0,float:'none'}}>
          &nbsp;–&nbsp;
          <UserLink id={props.comment.author_id}>{props.comment.user_name || props.comment.email}</UserLink>
          &nbsp;<When>{props.comment.created_at}</When>
        </WhoAndWhen>
      </div>

    </div>
  );
}

export default Comment;