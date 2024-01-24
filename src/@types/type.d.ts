type calendarType = {
    user_id: number;
    calendar_id: number;
    title: string;
    description: string;
    register_date: string;
    update_date: string;
}

type scheduleType = {
    schedule_id: number
    user_id: number
    title: string
    description: string
    register_date: string
    update_date: string
    due_date: string
    calendar_id: number
    is_done: boolean
    schedule_details?: scheduleDetailType[]
}

type scheduleDetailType = {
    schedule_detail_id: number
    schedule_id: number
    user_id: number
    done_YN: "Y" | "N"
    short_target_date: string
    repeat_type: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY",
    daily_interval: number
    weekly_interval: number
    weekly_days_mask: `${'0' | '1'}${'0' | '1'}${'0' | '1'}${'0' | '1'}${'0' | '1'}${'0' | '1'}${'0' | '1'}`
    short_due_date: number
}