import EmployeesListItem from "./../emplouees_list_item/employees_list_item"

import './employees_list.css';

const EmployeesList = ({data,onDelete,onToggleIncrease,onToggleRise}) => {
    const elements = data.map( item => {
        const {id, ...itemProps} = item;
        return(
            <EmployeesListItem
                key={id}
                {...itemProps}
                 onDelete={ () => onDelete(id) }
                onToggleIncrease={() => onToggleIncrease(id)}
                onToggleRise={ () => onToggleRise(id)}/>
        )
    });
    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default EmployeesList;