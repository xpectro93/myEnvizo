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
    let regExFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let isOnlyLatinChar = email.match(regExFormat);
    let [username, domain] = email.split('@')

    if(!domain) return false;
    let isValidPunctuationUser = true;
    let isValidPunctuationDomain = false;
    let emailLengthCheck = email.length <= 128
    if(username.includes(".")){
      isValidPunctuationUser = isValidPunctuation(username)
    }
    if(domain.includes(".")) {
      isValidPunctuationDomain = isValidPunctuation(domain)
    }

    return(
          isOnlyLatinChar && 
          isValidPunctuationDomain && 
          isValidPunctuationUser && 
          emailLengthCheck
          )
  }
export const validateUsername = username => username.length > 1 && username.length < 33; 

export const areEqual = (string1, string2) => {
    if(string1 !== "")
    return string1 === string2
};

export const validateSelect = option => Number(option) !== 0

export const checkEvent = e => {
    if(e.target &&
        e.target.parentElement &&
        e.target.parentElement.parentElement &&
        e.target.parentElement.parentElement.elements
        ) {
            return false;
        }
    else {
        return true
    };

}