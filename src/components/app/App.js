import App_info from "../app_info/app_info";
import SearchPanel from "../search_panel/search_panel";
import AppFilter from "../app_filter/app_filter";
import EmployeesList from "../employees_list/employees_list";
import EmployeesAddForm from "../employees_add_form/employees_add_form";
import React from "react";

import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            data : [
                {name: "Maxim Ionov", salary:2990 , increase:false,rise:true,id:1},
                {name: "Ruzick Danilov", salary:0 ,increase:true, rise:false, id:2},
                {name: "Dmitriy Duryagin", salary:41000 , increase:false,rise:false,id:3}
            ],
            term:' ',
            filter: 'all'
        }
        this.maxId = 4;
    }
    deleteItem = (id) =>{
        this.setState(({data}) =>{
            const index = data.findIndex(elem => elem.id === id);
            return{
                data:data.filter(item => item.id !== id)
            }

        } )

    }
    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            id: this.maxId++,
            rise:false
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }
   onToggleIncrease = (id) =>{
       this.setState(({data}) => ({
           data: data.map(item => {
               if (item.id === id){
                   return{...item,increase:!item.increase}
               }
               return item;
           })
       }))
   }
   onToggleRise = (id) =>{
       this.setState(({data}) => ({
           data: data.map(item => {
               if (item.id === id){
                   return{...item,rise:!item.rise}
               }
               return item;
           })
       }))
   }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPost = (items,filter) =>{
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise)

            case 'moreThen1000':
                return items.filter(item => item.salary > 1000)
            default:
                return items;
        }
    }
    onFilterSelect = (filter) =>{
        this.setState({filter})
    }
    render(){
        const {data, term,filter} = this.state;
        const increased = data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data,term),filter);
        return (
            <div className="app">
                <App_info
                    length={this.state.data.length}
                    increased={increased}
                />

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>

                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleIncrease={this.onToggleIncrease}
                    onToggleRise={this.onToggleRise}
                />
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;