import { IUser } from "../api/usersService";
import AutoComplete from "./Autocomplete";
import ResultItem from "./ResultItem";

export default function UsersAutocomplete() {
  return (
    <div className="autocomplete-container">
      <AutoComplete
        name="username"
        onRenderResults={(
          inputValue: string,
          user: IUser,
          onItemSelect: (user: IUser) => void
        ) => (
          <ResultItem
            inputValue={inputValue}
            resultItem={user}
            onItemSelect={onItemSelect}
          />
        )}
      />
    </div>
  );
}
