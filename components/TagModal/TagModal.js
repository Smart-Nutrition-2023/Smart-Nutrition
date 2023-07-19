
const TagModal = ({ setToggleProfileTag, toggleProfileTag }) => {

    const toggleProfileTagFunction = () => {
        setToggleProfileTag(!toggleProfileTag)
    }
    return(
        <>
          <div onClick={toggleProfileTagFunction} className=' font-["Jalnan"] rounded-3xl bg-neutral-200 w-full h-2/3 flex justify-center items-center'>
            Tags
          </div>
        </>
    );
}

export default TagModal;