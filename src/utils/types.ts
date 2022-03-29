type Schedule = {
  id: string;
  source: {
    place_name: String;
    place_cord: [Number, Number];
  };
  destination: {
    place_name: String;
    place_cord: [Number, Number];
  };
  duration: Number; // minutes
  distance: Number; // km
  timing: String;
  sharing_allowed?: Boolean;
  total_traveller?: Number;
  start_date: Date;
  end_date: Date;
  days: [Number];
};

export default Schedule;
