import "./app_info.css"




const App_info = ({increased,length}) => {

    return (
        <div className="app-info">
            <h1>Учет сотрудников в компании</h1>
            <h2>Общее число сотрудников: {length}</h2>
            <h3>Премию получат:{increased}</h3>
        </div>
    )
}

export default App_info;

