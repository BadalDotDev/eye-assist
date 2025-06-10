export type RoleType = "scribe" | "student" | "null";

export interface UserDetailsDataType {
  id: string;
  profilePhotoId: string | null;
  username: string;
  firstName: string;
  lastName: string | null;
  email: string;
  role: RoleType;
  dob: string;
  country: string;
  age: number;
  gender: string;
  mobileNumber: string;
  token: string;
  isEmailVerified: boolean;
  stepComplete: number;
  highestQualificationId: string;
  streamId: string;
  preferredLanguage: string;
  aboutMe: string;
  certificateId: string;
}

export interface GetStreamsPayloadType {
  qualificationId: string;
  role: string;
}

export interface QualificationType {
  id: string;
  qualification: string;
  value: number;
}

export interface GetQualificationsResponse {
  count: number;
  rows: QualificationType[];
}

export interface QualificationsListType {
  label: string;
  value: string;
}

export interface StreamsListType {
  label: string;
  value: string;
}
