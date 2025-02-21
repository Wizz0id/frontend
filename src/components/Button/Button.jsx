import "./Button.css"

export default function Button({ children, className, buttonClicked }){
    return (
    <button className={className} onClick={buttonClicked}>
        {children}
    </button>)
}