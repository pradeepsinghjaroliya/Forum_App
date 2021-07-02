import './CommentForm.css';
import {useState} from 'react';

function CommentForm(props) {
  const [content, setContent] = useState('');
  function addComment(ev) {
    ev.preventDefault();
    props.onAddCommentClick(content);
    setContent('');
  }
  return (
    <form onSubmit={ev => addComment(ev)}>
      <textarea className="Commentform_textarea" rows={3}
                      value={content}
                      onChange={ev => setContent(ev.target.value)}
                      style={{marginBottom:'10px'}}
                      placeholder={'Use comments to ask for more information or suggest improvements. Avoid answering questions in comments.'} />
      <div className="Commentform_btns">
        <button
          type={'submit'}>Add comment</button>
      </div>
    </form>
  );
}

export default CommentForm;