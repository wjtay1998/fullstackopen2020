import React from 'react'

const Filter = ({newSearch, handleFilter}) => {

    return(
        <form>
        <div>filter shown with: <input value = {newSearch}
                                  onChange = {handleFilter}/>
        </div>
        </form>
    )
}

export default Filter