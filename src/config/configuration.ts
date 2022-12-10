interface EnvironmentVariables {
  appUrl: string;
  port: number;
  node_env: string;
  http: {
    timeout: number;
    max_redirect: number;
  };
  mssql: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  }
}

export const configuration = (): EnvironmentVariables => {
  const envVariable: EnvironmentVariables = {
    appUrl: process.env.APP_URL,
    port: parseInt(process.env.PORT, 10),
    node_env: process.env.NODE_ENV,
    mssql: {
      host: process.env.MSSQL_HOST,
      port: parseInt(process.env.MSSQL_PORT, 10),
      username: process.env.MSSQL_USER,
      password: process.env.MSSQL_PASSWORD,
      database: process.env.MSSQL_DB,
    },
    http: {
      timeout: parseInt(process.env.HTTP_TIMEOUT, 10),
      max_redirect: parseInt(process.env.HTTP_MAX_REDIRECT, 10),
    },
  };
  console.log('🚀️ ~ envVariable', envVariable);
  return envVariable;
};
