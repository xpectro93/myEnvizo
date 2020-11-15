import { storage } from '../firebase';


export const upload = async(data, callback)=> {
    const uploadTask = storage.ref(`images/${data.name}`).put(data);
    try {
        await uploadTask.on("stage_changed", snapshot => {},
        error => console.log(error),
            async ()=> {
                let url = await storage.ref("images").child(data.name).getDownloadURL()
               await callback(url)
                

            }
        )
    }
    catch(err) {
        console.log(err.message)
    }
    
}