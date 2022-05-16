import dayjs from "dayjs";
import minMax from "dayjs/plugin/minMax";

let registered = false;

if (!registered) {
  dayjs.extend(minMax);
  registered = true;
}
