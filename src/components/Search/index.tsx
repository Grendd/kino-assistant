import React, {ChangeEvent, FormEvent} from "react";
import './styles.scss'

export interface SearchProps {
    inputValue: string
    onSubmit: (e: FormEvent<HTMLFormElement>) => void
    onChange: (value: string) => void
    className?: string
}

const Search = ({inputValue, onSubmit, onChange, className = ''}: SearchProps) => {
    return (
        <form onSubmit={onSubmit} onClick={e => e.stopPropagation()} className={`search-form`}>
            <input
                id="search"
                className={`search ${className}`}
                type="text"
                autoComplete="off"
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.currentTarget.value)}
                value={inputValue}
                placeholder={"Enter show name:"}
                maxLength={18}
            />
        </form>
    )
}

export default Search;