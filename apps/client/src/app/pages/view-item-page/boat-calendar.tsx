import {
  DatePickerCustomDay,
  DatePickerCustomHeaderTwoMonth,
} from '@magnetic/ui';
import DatePicker from 'react-datepicker';
import Loading from '../../components/loading';
import { useBoatCalendar } from '../../hooks/useBoatCalendar';
import moment from 'moment';
import { ErrorText } from '../../components/error-text';
import { useEffect, useState } from 'react';
import { bookedBoatDates } from '@magnetic/utils';

interface Props {
  startDate: Date | null;
  onChangeDate: (dates: [Date | null, Date | null]) => void;
  boatId: number;
}

function BoatCalendar(props: Props) {
  const { startDate, onChangeDate, boatId } = props;
  const from = moment().format('YYYY-MM-DD'); // today
  const to = moment().add(6, 'months').format('YYYY-MM-DD'); // 6 month
  const [occupiedDates, setOccupiedDates] = useState<Date[]>([]);

  const { isLoading, dates, error, isError, refetch } = useBoatCalendar({
    from,
    to,
    boatId: `${boatId}`,
  });

  useEffect(() => {
    if (dates.length > 0) {
      const bookedDates = bookedBoatDates(dates);
      setOccupiedDates(bookedDates);
    }
  }, [dates]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  return (
    <div className="addListingDatePickerExclude">
      <DatePicker
        selected={startDate}
        onChange={onChangeDate}
        minDate={new Date()}
        excludeDates={occupiedDates}
        selectsRange
        monthsShown={1}
        inline
        renderCustomHeader={(p) => <DatePickerCustomHeaderTwoMonth {...p} />}
        renderDayContents={(day, date) => (
          <DatePickerCustomDay dayOfMonth={day} date={date} />
        )}
      />
    </div>
  );
}

export default BoatCalendar;
