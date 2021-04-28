import { useState, useEffect } from 'react'
import { projectStorage, projectFirestore, timestamp } from '../firebase/config'

const useStorage = (file) => {
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [url, setUrl] = useState(null)

  useEffect(() => {
      
    //  Creates a reference with the specified file name
    const storageRef = projectStorage.ref(file.name)
    const collectionRef = projectFirestore.collection('images')

    // Puts the file in storage under this storageRef reference 
    // handles events of updating progress bar
    storageRef.put(file).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
      setProgress(percentage)
    }, (err) => {
      setError(err)
    }, async () => {
      const url = await storageRef.getDownloadURL()
      const createdAt = timestamp()
      await collectionRef.add({ url, createdAt })
      setUrl(url)
    })
  }, [file])

  return { progress, url, error }
}

export default useStorage


// import { useState, useEffect } from "react"
// import { projectStorage } from "../firebase/config"

// const useStorage = file => {
//     console.log(file)
//     const [progress, setProgress] = useState(0)
//     const [error, setError] = useState(null)
//     const [url, setUrl] = useState(null)

//     useEffect(() => {
        
//         // Creates a reference with the specified file name
//         const storageRef = projectStorage.ref(file.name)

//         // Puts the file in storage under this storageRef reference 
//         // handles events of updating progress bar
//         storageRef.put(file).on('state_changed').on('state_changed', snap => {
//             console.log(file)
//             let percentage = ( snap.bytesTransferred / snap.totalBytes ) * 100
//             setProgress(percentage)
//         }, err => {
//             setError(err)
//         }, async () => {
//             const url = await storageRef.getDownloadURL() 

//             setUrl(url)
//         })
//     },[file])

//     return { progress, url, error }
// }

// export default useStorage

