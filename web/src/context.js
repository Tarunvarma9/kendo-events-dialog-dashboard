import React, {createContext, useState} from 'react'

const GraphsContext = createContext()
// ["Category","MSME", "Classification", "CategorySpend"]
export function GraphsProvider({children}){
    const [graphsList, setGrapsList] = useState(["Category","MSME", "Classification", "CategorySpend"])
    const [localList, setLocalList] = useState(["Category","MSME", "Classification", "CategorySpend"])
    const dropdownList = ["Category","MSME", "Classification", "CategorySpend"]
    const [loginUser, setLoginUser] = React.useState("")
    const [hidden, setHidden] = useState(true);
    const [submitButtonStatus, setSubmitButtonStatus] = React.useState(false)

    const ChangeUserName = name => {
        console.log(name)
        setLoginUser(name)
    }

    const addGraph = g => {
        const updatedGraphsList = [...localList, g]
        setLocalList(updatedGraphsList)
        if (localList === graphsList){
            setSubmitButtonStatus(true)
        }
    }
    const removeGraph = g => {
        const updatedGraphsList = localList.filter((item) => {
            if (item !== g){
                return item
            }
        })
        setLocalList(updatedGraphsList)
        if (localList === graphsList){
            setSubmitButtonStatus(true)
        }
    }
    const changeView = () => {
        setLocalList(graphsList)
        setHidden(!hidden)
    }
    const hiddenview = () => {
        setHidden(!hidden)
    }
    const handleSubmitButton = () => {
        setGrapsList(localList)
    }
    React.useEffect(() => {
        const data1 = []
        const headers = {method: "GET",
        headers: {
          "access-control-allow-origin" : "*",
          "Content-type": "application/json; charset=UTF-8"
        }}
        const url ="http://127.0.0.1:8000/effigo/api/dashboard/allgraphsdetails/"
        const fetchData = async () => {
          const data = await fetch(url, headers);
          const json = await data.json();
          json.map((name) =>{
            data1.push(name.graph_name)
            })
        }

        fetchData()
       
      },[]);
    return(
        <GraphsContext.Provider value={{localList,submitButtonStatus,graphsList,hidden,hiddenview,dropdownList,loginUser,handleSubmitButton, ChangeUserName,changeView, addGraph, removeGraph}}>
            {children}
        </GraphsContext.Provider>
    )

}

export default GraphsContext