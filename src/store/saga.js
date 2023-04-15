import { all, fork } from "redux-saga/effects";
import demographic from "../actions/demographic_saga";
import episode from "../actions/episode_saga";
import events from "../actions/events_saga";
import layout from "../actions/layouts_saga";

export default function* () {
  yield all([demographic(), episode(), events(), layout()]);
}
