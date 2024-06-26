import * as moment from "moment";
import momentToUtcString from "./momentToUtcString";
const UTCRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
const ISORegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
const formatToTimestamp= (dateString: string ) => {
    if (UTCRegex.test(dateString)) {
        const date = new Date(dateString);
        const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
        return formattedDate;
    } else if(ISORegex.test(dateString)) {
        return dateString;
    }else{
        return (momentToUtcString(moment(dateString)) );
    }
}
export default formatToTimestamp;
