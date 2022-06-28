import img from './errorcat.gif'

const ErrorMessage = () => {
    return (
        <img style={{display: "block",
                     width: "500px",
                     height: "250px",
                     objectFit: "contain",
                     margin: "0 auto"}} src={img} alt="ERROR"/>
    )
}

export default ErrorMessage