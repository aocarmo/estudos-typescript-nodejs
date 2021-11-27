import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);
class DayjsDateProvider implements IDateProvider {
    compareIfBefore(start_date: Date, end_date: Date): boolean {
        return dayjs(start_date).isBefore(end_date);
    }
    addHours(hours: number): Date {
        return dayjs().add(hours, "hour").toDate();
    }
    addDays(day: number): Date {
        return dayjs().add(day, "days").toDate();
    }
    dateNow(): Date {
        return dayjs().toDate();
    }
    convertToUTC(data: Date): string {
        return dayjs(data).utc().local().format();
    }
    compareInHours(start_date: Date, end_date: Date): number {
        const end_date_utc = this.convertToUTC(end_date);
        const start_date_utc = this.convertToUTC(start_date);
        return dayjs(end_date_utc).diff(start_date_utc, "hours");
    }

    compareInDays(start_date: Date, end_date: Date): number {
        const end_date_utc = this.convertToUTC(end_date);
        const start_date_utc = this.convertToUTC(start_date);
        return dayjs(end_date_utc).diff(start_date_utc, "days");
    }
}

export { DayjsDateProvider };
