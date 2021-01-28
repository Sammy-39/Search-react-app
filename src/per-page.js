
const PerPage = (props) =>{
    return(
        <div className="per-page">
            <p> No. of Items </p>
            <input type="number" 
               className="form-control search-input" 
               value={props.value} 
               onChange={props.change} />
        </div>
    )
}

export default PerPage