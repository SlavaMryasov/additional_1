type ButtonProps = {
    name: string
    onClick: () => void
}

export const Button: React.FC<ButtonProps> = (props) => {

    const onClickHandler = () => {
        props.onClick()
    }

    return(
        <button onClick={onClickHandler}>{props.name}</button>
    )
}