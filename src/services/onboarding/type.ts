export interface OnboardUserPayloadType {
  isPageSkipped: boolean;
  stepComplete: number;
  dob?: string;
  age?: number;
  gender?: string;
  country?: string;
  mobileNumber?: string;
  highestQualificationId?: string;
  streamId?: string;
  preferredLanguage?: string;
  aboutMe?: string;
  certificateId?: string;
}
