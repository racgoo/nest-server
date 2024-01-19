const convertTinyintToBoolean = <T>(value: T,keys: string[]) => {
    keys.some(key => value[key] = (value[key]==0 ? false : true));
    return value;
}
export default convertTinyintToBoolean;