import {createContext, useState} from 'react'

const GraphsContext = createContext()

export function GraphsProvider({children}){
    const [graphsList, setGrapsList] = useState(["Category","MSME", "Classification", "CategorySpend"])
    const dropdownList = ["Category","MSME", "Classification", "CategorySpend"]
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
        setGrapsList(["Category","MSME", "Classification", "CategorySpend"])
        setHidden(!hidden)
    }
    const hiddenview = () => {
        setHidden(!hidden)
    }
    return(
        <GraphsContext.Provider value={{graphsList,hidden,hiddenview,dropdownList,changeView, addGraph, removeGraph}}>
            {children}
        </GraphsContext.Provider>
    )

}

export default GraphsContext