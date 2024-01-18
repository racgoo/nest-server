import * as moment from 'moment';
const momentToUtcString = (momentObject: moment.Moment) => {
    return momentObject.utc().format('YYYY-MM-DD HH:mm:ss')
}
export default momentToUtcString;