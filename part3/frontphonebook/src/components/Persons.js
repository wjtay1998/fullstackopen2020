import React from 'react';

const Persons = ({namesToShow, handleDelete}) => {
    
    return (
        <div>
            {namesToShow.map(person => <form key = {person.name} onSubmit = {(e) => handleDelete(e, person)}>{person.name} {person.number}
            <button type = "submit" > delete </button></form>)}
        </div>
    );
};


export default Persons;