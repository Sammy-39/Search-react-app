const SearchIcon = () =>{
    return(
        <i className="fas fa-search search"></i>
    )
}

const SearchForm = (props) =>{
    return(
        <form className="form" onSubmit={()=>{return false}}>
            <SearchIcon />
            <input type="text" className="form-control search-input" placeholder="Search To-do list" value={props.val} onChange={props.change}/>
        </form>
    )
}

const Search = (props) =>{
    return(
        <div className="search-con">
            <h1 className="my-3"> Search Name-Email </h1>
            <SearchForm change={props.change} val={props.value}/>
        </div>
    )
}

export default Search