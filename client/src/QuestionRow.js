import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import Tag from './Tag';
import When from "./When";
import UserLink from "./UserLink";
import './QuestionRow.css';

function QuestionRow({title,id,tags,author,createdAt}) {
  return (
    <div className="StyledQuestionRow" >
      <div className="QuestionStat" >1<span>votes</span></div>
      <div className="QuestionStat">2<span>answers</span></div>
      
      <div className="QuestionTitleArea">
        <Link to={'/questions/'+id} className="QuestionLink">{title}</Link>
        <div className="WhoAndWhen qrow" >
          <When>{createdAt}</When> <UserLink id={author.id}>{author.name || author.email}</UserLink>
        </div>
        {tags && tags.split(',').map(tag => (
          <Tag  name={tag} />
        ))}
      </div>
    </div>
  );
}

QuestionRow.propTypes = {
  createdAt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  tags: PropTypes.string,
  author: PropTypes.object,
};

export default QuestionRow;