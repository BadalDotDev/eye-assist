import { RootState } from "@/redux/store";

export const selectUserData = (state: RootState) => state.user.data;
export const selectUserDataIsLoading = (state: RootState) => state.user.isLoading

export const selectQualificataionsList = (state: RootState) =>
  state.user.qualificationList;


export const selectStreamsList = (state: RootState) => state.user.streamsList;

export const selectRole = (state: RootState) => state.user.role;
