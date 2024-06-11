export type Timesheet = {
  id: string;
  type: string;
  attributes: TimesheetAttributes;
};

export type TimesheetAttributes = {
  closed: boolean;
  term: string;
  state: string;
};
