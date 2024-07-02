import React from 'react'
import { MdSearch } from 'react-icons/md';

const Search = ({ handleSearchNote }) => {
    return (
        <div className='search flex items-center rounded-lg mb-5 p-[10px]'>
            <MdSearch className='search-icons' size="1.3em" />
            <input
                type="text"
                placeholder='search your notes...'
                onChange={(e) =>
                    handleSearchNote(e.target.value)
                }
            />
        </div>
    )
}

export default Search;