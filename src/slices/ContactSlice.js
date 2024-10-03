import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSensors = createAsyncThunk(
  "contacts/fetchSensors",
  async () => {
    try {
      const response = await axios.get(
        "http://88.198.159.175:9090/sensors?order=asc"
      );

      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchRecordsOfSensor = createAsyncThunk(
  "contacts/fetchRecordsOfSensor",
  async (sensorID) => {
    try {
      const response = await axios.get(
        `http://88.198.159.175:9090/records/${sensorID}?limit=100`
      );

      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const createSensor = createAsyncThunk(
  "contacts/createSensor",
  async (sensor) => {
    try {
      console.log(sensor);

      const response = await axios.post(
        "http://88.198.159.175:9090/sensors",
        sensor
      );
      console.log(response);

      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteSensor = createAsyncThunk(
  "contacts/deleteSensor",
  async (sensorId) => {
    try {
      const response = await axios.delete(
        `http://88.198.159.175:9090/sensors/${sensorId}`
      );
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const editSensor = createAsyncThunk(
  "contacts/editSensor",
  async (sensor) => {
    console.log(sensor, "shahedaaaaaaaaaaaaaaaaaaaa");

    try {
      const response = await axios.put(
        `http://88.198.159.175:9090/sensors/${sensor.id}`,
        sensor
      );

      response.data.id = sensor.id;

      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const initialState = {
  items: [],
  item: {},
  newItems: [],
  recordsOfSensor: [],
  searchItems: [],
  statues: "null",
  path: true,
};

const ContactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    changePath(state, action) {
      state.path = action.payload;
    },
    deleteSensorState(state, action) {
      state.newItems = state.items;
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.searchItems = state.items.filter(
        (item) => item.id !== action.payload
      );
    },
    searchContact(state, action) {
      state.searchItems = state.items.filter((item) =>
        item.fullname.includes(action.payload)
      );
    },
    getSensor(state, action) {
      console.log(action.payload);

      state.item = state.items.find((item) => item.id == action.payload);
    },
  },
  extraReducers: {
    // yadet bashe ke loading haye har ghesmat ra piade koni.
    [fetchSensors.pending]: (state, action) => {
      state.statues = "pending";
    },
    [fetchSensors.fulfilled]: (state, action) => {
      state.statues = "success";
      state.items = action.payload;
      state.searchItems = action.payload;
    },
    [fetchSensors.rejected]: (state, action) => {
      state.statues = "rejected";
    },
    [fetchRecordsOfSensor.pending]: (state, action) => {
      state.statues = "pending";
    },
    [fetchRecordsOfSensor.fulfilled]: (state, action) => {
      state.statues = "success";
      state.recordsOfSensor = action.payload;
    },
    [fetchRecordsOfSensor.rejected]: (state, action) => {
      state.statues = "rejected";
    },
    [createSensor.pending]: (state, action) => {
      state.statues = "pending";
    },
    [createSensor.fulfilled]: (state, action) => {
      state.statues = "success";
      state.items = [...state.items, action.payload];
      state.searchItems = state.items;
    },
    [createSensor.rejected]: (state, action) => {
      state.statues = "rejected";
    },
    // [deleteContact.pending]: (state, action) => {
    //     state.statues = "pending";
    // },
    // [deleteContact.fulfilled]: (state, action) => { age ina bashan moghe hazf kardan navigate mishe be balaye safha.
    //     state.statues = "success";
    // },
    [deleteSensor.rejected]: (state, action) => {
      state.statues = "rejected";
      state.items = state.newItems;
      state.searchItems = state.newItems;
    },
    [editSensor.pending]: (state, action) => {
      state.statues = "pending";
    },
    [editSensor.fulfilled]: (state, action) => {
      state.statues = "success";

      console.log(action.payload, "mannnnnnnnnnnnnnnnnnnnnnn");

      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      //   state.items[index] = {id: state.items[index].id, ...action.payload};
      state.items[index] = action.payload;
      state.searchItems = state.items;
    },
    [editSensor.rejected]: (state, action) => {
      state.statues = "rejected";
    },
  },
});

export default ContactSlice.reducer;
export const { changePath, deleteSensorState, searchContact, getSensor } =
  ContactSlice.actions;
