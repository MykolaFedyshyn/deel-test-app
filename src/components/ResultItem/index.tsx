import { IUser } from "../../api/usersService";

interface IResultItemProps {
  inputValue: string;
  resultItem: IUser;
  onItemSelect: (user: IUser) => void;
}

const ResultItem: React.FC<IResultItemProps> = ({
  inputValue,
  resultItem,
  onItemSelect,
}) => {
  return (
    <div
      key={resultItem.id}
      onClick={() => onItemSelect(resultItem)}
      className="results-item"
    >
      <span
        dangerouslySetInnerHTML={{
          __html: `${resultItem.firstName} ${resultItem.lastName}`.replace(
            new RegExp(inputValue, "gi"),
            "<mark>$&</mark>"
          ),
        }}
      />
    </div>
  );
};

export default ResultItem;
