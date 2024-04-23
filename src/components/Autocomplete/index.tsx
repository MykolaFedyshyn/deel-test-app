import React, { useState, useEffect, useCallback, useMemo } from "react";
import { fetchUsersData, IUser } from "../../api/usersService";
import { useDebounce } from "../../hooks/useDebounce";
import Input from "../Input";
import closeIcon from "../../assets/close.svg";
import searchIcon from "../../assets/search.svg";
import loadingIcon from "../../assets/loading.gif";
import "./style.css";
import ResultItem from "../ResultItem";

interface IAutocompleteProps {
  name: string;
  debounceValue?: number;
  apiDelayValue?: number;
  placeholder?: string;
  onRenderResults?: (
    inputValue: string,
    user: IUser,
    onItemSelect: (user: IUser) => void
  ) => React.ReactNode;
}

function AutoComplete({
  name,
  debounceValue = 300,
  apiDelayValue = 300,
  placeholder = "Type to search...",
  onRenderResults
}: IAutocompleteProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [cache, setCache] = useState<{ [key: string]: IUser[] }>({});
  const [optionSelected, setOptionSelected] = useState<boolean>(false);

  const debouncedInputValue = useDebounce(inputValue, debounceValue);

  const filterOptions = useCallback(
    async (value: string) => {
      setLoading(true);
      if (cache[value]) {
        setLoading(false);
        return cache[value];
      } else {
        const filteredData = await new Promise<IUser[]>((resolve) => {
          setTimeout(async () => {
            const users = await fetchUsersData();
            const filtered = users.filter((user) =>
              `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`.includes(
                value.toLowerCase()
              )
            );
            resolve(filtered);
          }, apiDelayValue); // Simulating a delay similar to a real REST call
        });
        setLoading(false);
        setCache((prevCache) => ({ ...prevCache, [value]: filteredData }));
        return filteredData;
      }
    },
    [cache, apiDelayValue]
  );

  useEffect(() => {
    if (!optionSelected && debouncedInputValue.trim() !== "") {
      // Only filter if an option has not been selected
      filterOptions(debouncedInputValue).then((filteredData) => {
        setFilteredOptions(filteredData);
      });
    } else {
      setFilteredOptions([]); // Clear filtered options if there's no input value
    }
  }, [debouncedInputValue, filterOptions, optionSelected]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setOptionSelected(false); // Reset optionSelected when input value changes
  };

  const handleOptionClick = (user: IUser) => {
    setInputValue(`${user.firstName} ${user.lastName}`);
    setFilteredOptions([]);
    setOptionSelected(true);
  };

  const noResults = useMemo(
    () =>
      filteredOptions.length === 0 &&
      inputValue.trim() !== "" &&
      !loading &&
      !optionSelected,
    [filteredOptions, inputValue, loading, optionSelected]
  );

  return (
    <div className="autocomplete">
      <Input
        name={name}
        label="User Name:"
        value={inputValue}
        placeholder={placeholder}
        onChange={handleInputChange}
        rightContent={
          loading ? (
            <img
              src={loadingIcon}
              className="loading-icon"
              alt="loading-icon"
            />
          ) : (
            <button className="clear-button" onClick={() => setInputValue("")}>
              <img src={closeIcon} className="close-icon" alt="close-icon" />
            </button>
          )
        }
        leftContent={
          <img src={searchIcon} className="search-icon" alt="search-icon" />
        }
      />
      {filteredOptions.length > 0 && (
        <div className="results-container">
          {filteredOptions.map((user) =>
            onRenderResults ? (
              onRenderResults(debouncedInputValue, user, handleOptionClick)
            ) : (
              <ResultItem
                inputValue={debouncedInputValue}
                resultItem={user}
                onItemSelect={handleOptionClick}
              />
            )
          )}
        </div>
      )}
      {noResults && (
        <div className="results-container">
          <div className="results-item">No results found</div>
        </div>
      )}
    </div>
  );
}

export default AutoComplete;
