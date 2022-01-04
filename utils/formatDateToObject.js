const formatDateToObject = (date) => {
    let dateDay = '';
    let dateMonth = '';
    let dateYear = '';

    for(let i=0;i<date.length;i++) {
        if(i<=1)
            dateDay+=date[i];
        else if(i>=3 && i<=date.length-6)
            dateMonth+=date[i];
        else if(i>=date.length-4)
            dateYear+=date[i];
    }

    return({dateDay, dateMonth, dateYear});
}

module.exports = formatDateToObject;