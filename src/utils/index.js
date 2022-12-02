import moment from "moment";

export const getRandomId = () => {
    return Math.floor(Math.random() * 10e10).toString(16);
};

export const getFlag = (string) => {
    const lowerString = string.toLowerCase();
    const flag = lowerString.split(" ").join("-");

    return flag;
};

export const getCurrentTime = () => {
    return moment().format("MMMM D, YYYY HH:mm");
};

export const getCurrentTimeToSecond = () => {
    return moment().format("MMMM D, YYYY HH:mm:ss");
};

export const getTimeFromNow = (date) => {
    return moment(date).fromNow();
};

export const getTimeToX = (createDate, endDate) => {
    const start = moment(createDate);
    let end;
    if (endDate) {
        end = moment(endDate);
    } else {
        end = moment(getCurrentTime());
    }

    return end.to(start, true);
};
