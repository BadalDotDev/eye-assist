import {
  GetStreamsPayloadType,
  QualificationsListType,
  RoleType,
  StreamsListType,
  UserDetailsDataType,
} from "@/services/user/type";
import { userService } from "@/services/user/userService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUserDetails = createAsyncThunk<
  UserDetailsDataType | null,
  void
>("user/getUserDetails", async (_, { rejectWithValue }) => {
  try {
    const userDetails = await userService.getUserDetails();

    return userDetails;
  } catch (error: any) {
    return rejectWithValue(null);
  }
});

export const getAllQualificationsAPI = createAsyncThunk(
  "user/getAllQualifications",
  async (_, { rejectWithValue }) => {
    try {
      const res = await userService.getAllQualifications();
      return res;
    } catch (error: any) {
      return rejectWithValue(null);
    }
  },
);

export const getAllStreamsAPI = createAsyncThunk(
  "user/streams",
  async (params: GetStreamsPayloadType, { rejectWithValue }) => {
    try {
      const res = await userService.getAllStreams(params);
      return res;
    } catch (error: any) {
      return rejectWithValue(null);
    }
  },
);

interface UserDetailsState {
  isLoading: boolean;
  data: UserDetailsDataType | null;
  role: RoleType;
  qualificationList: QualificationsListType[] | [];
  streamsList: StreamsListType[] | [];
}

const initialState: UserDetailsState = {
  isLoading: false,
  data: null,
  role: null,
  qualificationList: [],
  streamsList: [],
};

const userSlice = createSlice({
  name: "user-details",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.role = action.payload?.role;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.data = null;
      }),
      builder.addCase(getAllQualificationsAPI.fulfilled, (state, action) => {
        if (action.payload.data) {
          const { count, rows } = action.payload.data;
          let qualificationOptionsList: QualificationsListType[] = [];

          if (count > 0 && rows.length) {
            rows.map((row) => {
              const label = row.qualification;
              const value = row.id;
              qualificationOptionsList.push({
                label,
                value,
              });
            });
          }

          qualificationOptionsList.push({
            label: "Other",
            value: "other",
          });

          state.qualificationList = qualificationOptionsList;
        } else {
          state.qualificationList = [];
        }
      }),
      builder.addCase(getAllStreamsAPI.fulfilled, (state, action) => {
        if (action.payload.data) {
          const { count, rows } = action.payload.data;
          let streamsOptionsList: StreamsListType[] = [];

          if (count > 0 && rows.length) {
            rows.map((row) => {
              const label = row.stream;
              const value = row.id;
              streamsOptionsList.push({
                label,
                value,
              });
            });
          }

          streamsOptionsList.push({
            label: "Other",
            value: "other",
          });

          state.streamsList = streamsOptionsList;
        } else {
          state.streamsList = [];
        }
      });
  },
});

export const {} = userSlice.actions;

export const userReducer = userSlice.reducer;
