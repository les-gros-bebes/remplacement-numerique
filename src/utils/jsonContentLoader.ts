import dialogs from "../data/dialogs.json"
import choices from "../data/choices.json"


/* 
*  locationNumber : 0=school | 1=courtyard | 2=classroom | 3=sports_hall | 4=library | 5=principal_office
*  conversationIndex / choicesIndex : to be iterated from 0 to end
*/

export const getDialogFromLocation = (locationNumber: number, conversationIndex: number) => {
    return dialogs[locationNumber].conversations[conversationIndex] || null
}

export const getChoicesFromLocation = (locationNumber: number, choicesIndex: number) => {
    return choices[locationNumber].choices[choicesIndex] || null
}
