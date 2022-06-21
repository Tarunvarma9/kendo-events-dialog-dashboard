import {createContext, useState} from 'react'

const GraphsContext = createContext()

export function GraphsProvider({children}){
    const [graphsList, setGrapsList] = useState(["Category","MSME", "Classification", "CategorySpend", "BarChart"])
    const dropdownList = ["Category","MSME", "Classification", "CategorySpend", "BarChart"]
    const [hidden, setHidden] = useState(true);

    const addGraph = g => {
        const updatedGraphsList = [...graphsList, g]
        setGrapsList(updatedGraphsList)
    }

    const removeGraph = g => {
        const updatedGraphsList = graphsList.filter((item) => {
            if (item !== g){
                return item
            }

        })
        setGrapsList(updatedGraphsList)
    }
    const changeView = () => {
        setHidden(!hidden)
    }
    return(
        <GraphsContext.Provider value={{graphsList,hidden,dropdownList,changeView, addGraph, removeGraph}}>
            {children}
        </GraphsContext.Provider>
    )

}

export default GraphsContext