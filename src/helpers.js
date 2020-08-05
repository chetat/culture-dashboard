//Helper function to sort array of objects by given attribute
export function compareValues(key, order = 'asc') {
    console.log(key)
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}

// Sort Object by date
export function compareDateValues(key, order = 'asc') {
    console.log(key)
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const dateA = new Date(a[key]).getTime();
        const dateB = new Date(b[key]).getTime();
        let comparison = 0;
        if (dateA > dateB) {
            comparison = 1;
        } else if (dateA < dateB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}

export function sortObjectEntries(obj){
    const sortedArr = Object.entries(obj).sort((a,b)=>b[0]-a[0])
    return sortedArr
}
 /*     function sortObject(obj) {
        return Object.keys(obj).sort().reduce(function (result, key) {
            result[key] = obj[key];
            return result;
        }, {});
    }
*/