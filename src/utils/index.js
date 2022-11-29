export const randomId = () => Math.floor(Math.random() * 10e10).toString(16);

export const getFlag = (string) => {
    const lowerString = string.toLowerCase();
    const flag = lowerString.split(" ").join("-");

    return flag;
};
