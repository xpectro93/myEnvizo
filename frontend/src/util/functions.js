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
export const isValidPunctuation = input => {
    if(!input) return false;
    let periodIndex = input.indexOf(".");
    if(input[periodIndex  + 1] === "." || input[periodIndex  - 1] ===".") {
        return false;
    }
    return true;
}

export const validateEmail = email => {
    if(!email) return false;

    let isOnlyLatinChar = email.match(/[^a-z0-9@\.]/);
    let [userName, domain] = email.split('@')
    let isValidPunctuationUser = true;
    let isValidPunctuationDomain = false;
    let emailLengthCheck = email.length <= 128
    if(userName.includes(".")){
      isValidPunctuationUser = isValidPunctuation(userName)
    }
    if(domain.includes(".")) {
      isValidPunctuationDomain = isValidPunctuation(domain)
    }

    return(
          !isOnlyLatinChar && 
          isValidPunctuationDomain && 
          isValidPunctuationUser && 
          emailLengthCheck
          )
  }
export const validateUsername = username => username.length > 1 && username.length < 33; 

export const areEqual = (string1, string2) => string1 === string2;

export const validateSelect = option => Number(option) !== 0
