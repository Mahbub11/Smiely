export const EditData =(data,id,posts)=>{
    const newData = data.map(item=>item._id === id ? posts :item)
    console.log(newData)
    return newData
}