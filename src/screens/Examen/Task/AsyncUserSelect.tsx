import makeAnimated from "react-select/animated"
import AsyncSelect from "react-select/async"
import { getData } from "../../../api"
import { User } from "../../../interface"

const animatedComponents = makeAnimated()

interface Option {
    value: number;
    label: string;
}

interface AsyncUserSelectProps {
    selectedUsers: Option[];
    onChange: (selected: Option[]) => void;
}

export const formatOptions = (items: User[]) => {
    return items.map((item) => ({
        value: item.id,
        label: `${item.name} ${item.last_name} - ${item.email} - ${item.dni}`,
    }));
};

const promiseOptions = (inputValue: string) =>
    new Promise<Option[]>((resolve) => {
        getData("users", undefined, { params: { search: inputValue } }).then((data) => {
            resolve(formatOptions(data));
        });
    });

export default function AsyncUserSelect({ selectedUsers, onChange }: AsyncUserSelectProps) {
    return (
        <>
            <label className="form-label m-0">Usuarios</label>
            <AsyncSelect
                components={animatedComponents}
                isMulti
                cacheOptions
                defaultOptions
                
                loadOptions={promiseOptions}
                value={selectedUsers} 
                onChange={(selected) => onChange(selected as Option[])}
            />
        </>
    );
}
