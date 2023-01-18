import {useField} from '../hooks';

const CreateNew = ({addNew}) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault();

    addNew({
      content: content.attributes.value,
      author: author.attributes.value,
      info: info.attributes.value,
      votes: 0
    });
  };

  const reset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" {...content.attributes} />
        </div>
        <div>
          author
          <input name="author" {...author.attributes} />
        </div>
        <div>
          url for more info
          <input name="info" {...info.attributes} />
        </div>
        <button>create</button>
        <button type='button' onClick={reset}>reset</button>
      </form>
    </div>
  );
};

export default CreateNew;