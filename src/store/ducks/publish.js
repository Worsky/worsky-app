export const Types = {
  LOAD_REPORT_TYPE: "LOAD_REPORT_TYPE",
  HANDLE_REPORT_TYPE: "HANDLE_REPORT_TYPE",
  PUBLISH: "PUBLISH",
  PUBLISH_FALIURE: "PUBLISH_FALIURE",
  STOP_LOAD: "STOP_LOAD",
  DISABLE_CLEAR: "DISABLE_CLEAR",
  SEND_MEDIA: "SEND_MEDIA",
  SEND_DONE: "SEND_DONE",
  MUTE_SOUND: "MUTE_SOUND",
  UPLOAD_ANDROID_IMAGE: "UPLOAD_ANDROID_IMAGE",
  UPLOAD_ANDROID_VIDEO: "UPLOAD_ANDROID_VIDEO",
  UPLOAD_IOS_IMAGE: "UPLOAD_IOS_IMAGE",
  UPLOAD_IOS_VIDEO: "UPLOAD_IOS_VIDEO"
};

const INITIAL_STATE = {
  reportTypes: [],
  faliure: false,
  loading: false,
  clear: false,
  media: {},
  mediaType: null,
  loadButton: false,
  uri: null,
  mute: false,
  loadMedia: false
};

export default function publish(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.LOAD_REPORT_TYPE:
      return state;

    case Types.HANDLE_REPORT_TYPE:
      return {
        ...state,
        reportTypes: action.payload.reportTypes
      };

    case Types.PUBLISH:
      return {
        ...state,
        loading: true,
        faliure: false,
        clear: true,
        loadMedia: false
      };

    case Types.PUBLISH_FALIURE:
      return {
        ...state,
        loading: false,
        faliure: true,
        clear: true,
        loadMedia: false
      };

    case Types.STOP_LOAD:
      return { ...state, loading: false, faliure: false, loadMedia: false };

    case Types.DISABLE_CLEAR:
      return { ...state, clear: false };

    case Types.UPLOAD_ANDROID_IMAGE ||
      Types.UPLOAD_ANDROID_VIDEO ||
      Types.UPLOAD_IOS_IMAGE ||
      Types.UPLOAD_IOS_VIDEO:
      return {
        ...state,
        media: action.payload.media,
        mediaType: action.payload.mediaType,
        loadButton: true,
        loadMedia: true
      };

    case Types.SEND_DONE:
      return {
        ...state,
        loadButton: false,
        uri: action.payload.uri,
        loadMedia: false
      };

    case Types.MUTE_SOUND:
      return {
        ...state,
        mute: action.payload.mute
      };

    default:
      return state;
  }
}

export const Creators = {
  loadReportTypes: () => ({
    type: Types.LOAD_REPORT_TYPE
  }),

  handleReportTypes: reportTypesData => ({
    type: Types.HANDLE_REPORT_TYPE,
    payload: {
      reportTypes: reportTypesData
    }
  }),

  publishNow: (
    latitude,
    longitude,
    description,
    mediaUrl,
    entityId,
    userId
  ) => ({
    type: Types.PUBLISH,
    payload: {
      latitude,
      longitude,
      description,
      mediaUrl,
      entityId,
      userId
    }
  }),

  publishFaliure: () => ({
    type: Types.PUBLISH_FALIURE
  }),

  stopLoad: () => ({
    type: Types.STOP_LOAD
  }),

  disableClear: () => ({
    type: Types.DISABLE_CLEAR
  }),

  sendDone: uri => ({
    type: Types.SEND_DONE,
    payload: {
      uri
    }
  }),

  muteSound: (mute = false) => ({
    type: Types.MUTE_SOUND,
    payload: {
      mute
    }
  }),

  uploadAndroidImage: media => ({
    type: Types.UPLOAD_ANDROID_IMAGE,
    payload: {
      media
    }
  }),
  uploadAndroidVideo: media => ({
    type: Types.UPLOAD_ANDROID_VIDEO,
    payload: {
      media
    }
  }),
  uploadIosImage: media => ({
    type: Types.UPLOAD_IOS_IMAGE,
    payload: {
      media
    }
  }),
  uploadIosVideo: media => ({
    type: Types.UPLOAD_IOS_VIDEO,
    payload: {
      media
    }
  })
};
