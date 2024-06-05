

export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export const getUserData = () => {
    if (localStorage.getItem('userData')) {
        return JSON.parse(localStorage.getItem('userData'));
    } else {
        return {};
    }
}



export const getImage = (path, fileName) => {
    return require(`${path + fileName.toLowerCase()}`);
}

export const getEmpId = () => {

    if (localStorage.getItem('userData')) {
        let EmpID = JSON.parse(localStorage.getItem('userData')).EmpID;
        if (EmpID) {
            return EmpID
        } else {
            return null;
        }
    }
};

export const getEmpName = () => {

    if (localStorage.getItem('userData')) {
        let name = JSON.parse(localStorage.getItem('userData')).firstName;
        if (name) {
            return name
        } else {
            return null;
        }
    }
};

export const groupByKey = (array, key) => {
    return array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
        return result;
    }, {});
}

// export const sortAdminDataByDate = (array) => {
//     if (array.length > 0) {
//         array.sort((a, b) => {
//             let dateA = new Date(a.CreatedDate);
//             let dateB = new Date(b.CreatedDate);
//             return dateA - dateB;
//         });
//     }
// };

export const getIndicationText = (itemObj) => {
    if (itemObj === 'tdr') {
        return "Tdr";
    }
    else if (itemObj === 'aa') {
        return 'Aplastic Anaemia';
    } else if (itemObj === 'itp') {
        return 'Immune Thrombocytopenic Purpura';
    } else {
        return '-NA-';
    }
}

export function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function generateColorArray(count, color) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        colors.push(color);
    }
    return colors;
}




