export const getCooksFromReq = (req, cookName) => {
    let cooksList = {};
    let cookValue;
    const rhc = req.headers.cookie;

    rhc ?
        rhc.split(';').forEach((cookie)=>{
            let parts = cookie.split('=');
            cooksList[parts.shift().trim()] = decodeURI(parts.join('='));
        })
    : null

    if(cookValue = cooksList[`${cookName}`]){
        return cookValue
    } else {
        return undefined
    }
}