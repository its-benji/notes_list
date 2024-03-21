import "./styles.css"
function RemoveNote(props) {

    return (
        <div>
            <button id={props.id} className='button' onClick={props.handleClick}>X</button>
        </div>
    )
}

export default RemoveNote