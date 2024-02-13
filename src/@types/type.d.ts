type calendarType = {
  user_id: number;
  calendar_id: number;
  title: string;
  description: string;
  register_date: string;
  update_date: string;
};

type scheduleType = {
  schedule_id: number;
  user_id: number;
  title: string;
  description?: string;
  register_date: string; 
  update_date: string; 
  due_date: string;
  calendar_id: number;
  is_done: boolean;
  repeat_type: 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  weekly_days_mask: `${'0' | '1'}${'0' | '1'}${'0' | '1'}${'0' | '1'}${
    | '0'
    | '1'}${'0' | '1'}${'0' | '1'}`;
  interval_due_date: string | null;
  interval_num: number;
  schedule_details?: scheduleDetailType[];
  schedule_infos?: scheduleInfoType[];
};

type scheduleInfoType = {
  schedule_info_id: number;
  schedule_id: number;
  register_date: string;
  update_date: string;
  done_Yn: "Y" | "N"
  target_date: string;
  user_id: number
}

type scheduleDetailType = {
  schedule_detail_id: number;
  schedule_id: number;
  user_id: number;
  done_YN: 'Y' | 'N';
  short_target_date: string;
  repeat_type: 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  daily_interval: number;
  weekly_interval: number;
  weekly_days_mask: `${'0' | '1'}${'0' | '1'}${'0' | '1'}${'0' | '1'}${
    | '0'
    | '1'}${'0' | '1'}${'0' | '1'}`;
  short_due_date: number;
};
