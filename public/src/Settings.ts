interface Settings {
  PORT: string;
  IS_DEVELOPMENT: boolean;
  API_BASE_PATH: string;
  WS_API_BASE_PATH: string;
  [key: string]: string | boolean;
}

const settings: Settings = {
  API_BASE_PATH:
    process.env.NODE_ENV !== 'development'
      ? process.env.API_URL || 'http://13.234.175.47:32234'
      : 'http://localhost:5002',
  PORT: process.env.PORT || '5002',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  WS_API_BASE_PATH:
    process.env.NODE_ENV !== 'development'
      ? process.env.API_URL || 'ws://13.234.175.47:32234'
      : 'ws://localhost:5002',
};

export default settings;
