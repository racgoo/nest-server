import axios from "axios";
import * as moment from "moment";
import updateSpecialDayModel from "src/model/schedule/updateSpecialDayModel";
import sleep from "src/utils/time/sleep";
const updateSpecialDayAction = async () => {
    let currentMoment = moment();
    let currentYear = currentMoment.get("year");
    for(let year=2004;year<=currentYear+2;year++){
      for(let month=1;month<=12;month++){
        let stringMonth = String(month).length === 1 ? `0${month}` : String(month);
        let stringYear = String(year);
        let result = await axios.get(`http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?solYear=${stringYear}&solMonth=${stringMonth}&ServiceKey=UmzXQ2aP3py%2FWrdYS3vKLLhdVt1O%2FnIviLU7qdt9dR5g8ehHhifeSucprlKjVwUFimmS9i1ZK7Vtxcbk%2BCAz%2FQ%3D%3D&_type=json`);
        await sleep(100);
        if(result?.data?.response?.body?.items?.item){
          let items = [];
          if(result?.data?.response?.body?.items?.item?.length==undefined){
            items.push(result?.data?.response?.body?.items?.item);
          }else{
            items = result?.data?.response?.body?.items?.item;
          }
          items.some( async(item) => {
            await updateSpecialDayModel({
              holiday_Yn: item.isHoliday,
              local_date_number: item.locdate,
              name: item.dateName
            });
          });
        }
      }
    }
}
export default updateSpecialDayAction;